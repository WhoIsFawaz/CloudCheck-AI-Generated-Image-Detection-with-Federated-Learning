from functools import wraps
from flask import request, jsonify
from models import APIKey, User

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get the Authorization header
        auth_header = request.headers.get('Authorization')
        
        # Check if the header exists and is formatted correctly
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"status": "error", "error": "Authorization header missing or invalid"}), 401

        # Extract the API key from the header
        api_key_value = auth_header.split(" ")[1]  # Get the token after "Bearer"
        
        # Look up the API key in the database
        api_key = APIKey.query.filter_by(key=api_key_value).first()
        if not api_key:
            return jsonify({"status": "error", "error": "Invalid API key"}), 401

        # Check if the API key belongs to a valid user
        user = User.query.get(api_key.user_id)
        if not user:
            return jsonify({"status": "error", "error": "API key does not belong to a valid user"}), 401

        # If valid, proceed to the actual view function
        kwargs['api_key'] = api_key
        kwargs['user'] = user
        return f(*args, **kwargs)
    
    return decorated_function
