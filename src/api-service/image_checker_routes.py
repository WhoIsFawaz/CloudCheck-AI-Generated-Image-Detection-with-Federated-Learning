from flask import Blueprint, request, jsonify
from utils import require_api_key
import requests
import os

import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from PIL import Image, UnidentifiedImageError
from io import BytesIO

MOBILENET_URL = 'https://tfhub.dev/google/imagenet/mobilenet_v3_small_100_224/feature_vector/5'
MOBILENET = hub.KerasLayer(MOBILENET_URL, trainable=False)

FEDERATED_SERVER_URL = "http://localhost:8080/fl-service/get_model"
FEDERATED_GLOBAL_MODEL = f"{FEDERATED_SERVER_URL}/model.h5"
CLASS_NAMES = ['Fake', 'Real']

image_checker_blueprint = Blueprint('image_checker', __name__)

def download_file(url, local_path):
    """Download a file from a URL and save it locally."""
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
    else:
        raise Exception(f"Failed to download file: {response.status_code}")

def download_model(model_url, model_path="model.h5"):
    """Download the model from a URL and save it locally."""
    download_file(model_url, model_path)
    return model_path

def classify_image(image_file_path, model):
    # Load image file and convert it to a tensor
    print("Downloading image...")
    response = requests.get(image_file_path)
    image = Image.open(BytesIO(response.content))
    image = image.convert('RGB')  # Ensure it's a 3-channel RGB image

    print("Classifying image...")
    # Preprocess image
    image = image.resize((224, 224))  # Resize to MobileNet input size
    image_array = np.array(image) / 255.0  # Normalize pixel values to [0, 1]
    test_tensor = tf.convert_to_tensor(image_array, dtype=tf.float32)
    test_tensor = tf.expand_dims(test_tensor, axis=0)  # Add batch dimension

    # Pass the image tensor through the MobileNet layer
    test_image_features = MOBILENET(test_tensor)  # Extract features without .predict()

    # Get prediction from the classification model
    prediction = model.predict(test_image_features)  # Use .predict() on the actual model
    prediction = tf.squeeze(prediction)  # Remove any unnecessary dimensions

    # Find the index with the highest confidence
    highest_index = tf.argmax(prediction).numpy()
    prediction_array = prediction.numpy()

    # Generate prediction result text
    prediction = CLASS_NAMES[highest_index]
    confidence = prediction_array[highest_index] * 100
    prediction_txt = f"Prediction: {prediction} with {confidence:.2f}% confidence"
    print(prediction_txt)

    print("Image classified!")
    return prediction, confidence

@image_checker_blueprint.route('/v1/check-image', methods=['POST'])
@require_api_key
def check_image(api_key, user):
    try:
        data = request.get_json()
        image_url = data.get("image_url")

        model_path = "model/model.h5"
        if not os.path.exists(model_path):
            download_model(FEDERATED_GLOBAL_MODEL, model_path)

        # Load the model from the local path
        image_checker_model = tf.keras.models.load_model(model_path)
        prediction, confidence = classify_image(image_url, image_checker_model)

        api_key.increment_usage()

        return jsonify({
            "status": "success",
            "image_url": image_url,
            "prediction": prediction,
            "confidence": str(confidence)
        })
    except UnidentifiedImageError as e:
        print(e)
        return jsonify({
            "status": "error",
            "image_url": image_url,
            "error": "The provided file is not a valid image."
        }), 400
    except requests.exceptions.RequestException as e:
        print(e)
        return jsonify({
            "status": "error",
            "image_url": image_url,
            "error": "Error downloading image."
        }), 500
    except Exception as e:
        print(e)
        return jsonify({
            "status": "error",
            "image_url": image_url,
            "error": "Something went wrong."
        }), 500
