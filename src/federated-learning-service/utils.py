import tensorflow as tf
import tensorflowjs as tfjs
import numpy as np
import io
import time
import os
import json
import hashlib
import re
from config import *

""" Functions """
# Function to calculate the SHA256 hash of a file or string
def get_hash(object, is_file=True):
  print(f"[HASH] Calculating {'file' if is_file else 'string'} hash...")
  sha256 = hashlib.sha256()
  if(is_file):
    # Calculate hash of file
    print(f"[HASH] Reading file: {object}")
    with open(object, "rb") as file:
        while True:
          # Read the file in chunks
          chunk = file.read(4096)
          if not chunk:
              break
          sha256.update(chunk)
  else:
    # Calculate hash of string
    sha256.update(object.encode())
  hash_result = sha256.hexdigest()
  print(f"[HASH] Hash calculation complete: {hash_result[:8]}...")
  return hash_result

# Function to calculate the SHA256 hash of a model (assume model.json and its corresponding weights.bin file are present in the file path provided)
def get_model_hash(folder_path):
  print(f"[MODEL HASH] Calculating model hash for folder: {folder_path}")
  # NOTE: .h5 model file is not used as it will always produce a different hash
  # Get hash of JSON and weights file
  print("[MODEL HASH] Calculating hash of model.json...")
  json_hash = get_hash(f"{folder_path}/model.json")
  
  # Read JSON file to get the corresponding weights file
  print("[MODEL HASH] Loading weights file information...")
  with open(f"{folder_path}/model.json", "r") as json_file:
    weights_file = json.load(json_file)['weightsManifest'][0]['paths'][0]
    print("[MODEL HASH] Weights file loaded: ", weights_file)
    if(re.match("\.\/(.*)", weights_file)):
      weights_file = re.match("\.\/(.*)", weights_file).group(1)
  
  # Get hash of weights file
  print("[MODEL HASH] Calculating hash of weights file...")
  weights_hash = get_hash(f"{folder_path}/{weights_file}")
  print("[MODEL HASH] Weights hash: ", weights_hash)

  # Get hash of concatenated hashes
  final_hash = get_hash(json_hash + weights_hash, is_file=False)
  print(f"[MODEL HASH] Final model hash calculated: {final_hash[:8]}...")
  return final_hash

# Function to load a model
def load_model(file_path):
  print(f"[LOAD MODEL] Loading model from: {file_path}")
  # Return model
  model = tf.keras.saving.load_model(file_path)
  print("[LOAD MODEL] Model loaded successfully")
  print(model)
  return model

def save_model(folder_path):
    # Define file paths
    json_path = os.path.join(folder_path, "model.json")
    weights_path = os.path.join(folder_path, "weights.bin")
    h5_path = os.path.join(folder_path, "model.h5")

    # Read model JSON configuration
    with open(json_path, "r") as json_file:
        json_content = json_file.read()
    
    # Read model weights
    with open(weights_path, "rb") as weights_file:
        weights_content = weights_file.read()

    # Load model using TensorFlow.js deserializer
    with tf.Graph().as_default(), tf.compat.v1.Session() as sess:
        # Deserialize Keras model from JSON and weights
        current_model = tfjs.converters.deserialize_keras_model(
            json_content, weight_data=[weights_content], use_unique_name_scope=True
        )
        
        # Save the model as model.h5
        current_model.save(h5_path)

    return h5_path


# Function to check for a new client model
def check_new_model(model, list_models, global_hash):
  print("[CHECK MODEL] Checking if model is new...")
  print(f"[CHECK MODEL] Model hash: {model['hash'][:8]}...")
  print(f"[CHECK MODEL] Global hash: {global_hash[:8]}...")
  print(f"[CHECK MODEL] Training size: {model['training_size']}")
  
  # Check for matching hash
  if(model['hash'] == global_hash):
    print("\n[CHECK MODEL] Global model detected! Model already exists!")
    return False
  # Check for invalid training size
  if(model['training_size'] <= 0):
    print("\n[CHECK MODEL] Training size of model is invalid!")
    return False
  # Loop through each model in the list of models
  for current_model in list_models:
    # Check for identical model hashes
    if(current_model['hash'] ==  model['hash']):
      print("\n[CHECK MODEL] Model already exists!")
      return False
  print("[CHECK MODEL] Model is new and valid!")
  return True

# Function to write to the accepted client models file
def update_client_models_file(new_list):
  print("[UPDATE MODELS] Updating client models file...")
  with open(FILE_CLIENT_MODELS, "w") as file:
    json.dump(new_list, file)
  print(f"[UPDATE MODELS] Successfully updated with {len(new_list)} models")

# Function to load a list from the accepted client models file
def load_client_models_file():
  print("[LOAD MODELS] Loading client models file...")
  with open(FILE_CLIENT_MODELS, "r") as file:
    list_clients = json.load(file)
  training_size = 0
  for i in list_clients:
    training_size += i['training_size']
  print(f"[LOAD MODELS] Loaded {len(list_clients)} models with total training size: {training_size}")
  return len(list_clients), list_clients, training_size
  
""" Classes """
# Class to receive models from client edge devices
class ModelReceiver(object):
  # Constructor
  def __init__(self):
    print("[MODEL RECEIVER] Initializing model receiver...")
    self._model_json_bytes = None
    self._model_json_writer = None
    self._weight_bytes = None
    self._weight_writer = None

  # Function to handle incoming uploaded model data (JSON and weights.bin)
  def stream_factory(self, total_content_length, content_type, filename, content_length=None):
    print(f"[STREAM FACTORY] Processing file: {filename}")
    if filename == 'model.json':
      self._model_json_bytes = io.BytesIO()
      self._model_json_writer = io.BufferedWriter(self._model_json_bytes)
      print("[STREAM FACTORY] Created model.json writer")
      return self._model_json_writer
    elif filename == 'model.weights.bin':
      self._weight_bytes = io.BytesIO()
      self._weight_writer = io.BufferedWriter(self._weight_bytes)
      print("[STREAM FACTORY] Created weights.bin writer")
      return self._weight_writer

  # Function to save model files (JSON, weights and .h5 workable model)
  def save_model(self):
    print("[SAVE MODEL] Starting model save process...")
    # Get current UNIX timestamp
    unix_timestamp = int(time.time())
    # Create subdirectory
    subdirectory = f"models/saved/{unix_timestamp}"
    os.makedirs(subdirectory, exist_ok=True)
    print(f"[SAVE MODEL] Created directory: {subdirectory}")

    # Prepare writers
    print("[SAVE MODEL] Preparing writers...")
    self._model_json_writer.flush()
    self._weight_writer.flush()
    self._model_json_writer.seek(0)
    self._weight_writer.seek(0)
    
    # Get model's JSON configurations
    print("[SAVE MODEL] Reading JSON content...")
    json_content = self._model_json_bytes.read()
    # Get model's weights
    print("[SAVE MODEL] Reading weights content...")
    weights_content = self._weight_bytes.read()
    # Get training size
    json_dict = json.loads(json_content)
    training_size = json_dict['userDefinedMetadata']['training_size']
    print(f"[SAVE MODEL] Training size: {training_size}")
    
    # Save model and weights in their basic forms
    print("[SAVE MODEL] Saving model files...")
    with open(f"{subdirectory}/model.json", "w") as json_file:
      # Remove user defined metadata before saving model.json
      del json_dict['userDefinedMetadata']
      json.dump(json_dict, json_file)
    with open(f"{subdirectory}/model.weights.bin", "wb") as weights_file:
      weights_file.write(weights_content)

    # Create environment for model
    print("[SAVE MODEL] Creating TensorFlow environment...")
    with tf.Graph().as_default(), tf.compat.v1.Session():
      # Prepare workable model
      print("[SAVE MODEL] Deserializing Keras model...")
      current_model = tfjs.converters.deserialize_keras_model(json_content, weight_data=[weights_content], use_unique_name_scope=True)

      # Save workable model
      print("[SAVE MODEL] Saving .h5 model...")
      current_model.save(f"{subdirectory}/model.h5")

    # Get SHA256 hash of model
    print("[SAVE MODEL] Calculating model hash...")
    hash = get_model_hash(subdirectory)

    print(f"[SAVE MODEL] Model save complete. Hash: {hash[:8]}...")
    # Return current model
    return {"file_path": subdirectory, "training_size": training_size, "hash": hash}
