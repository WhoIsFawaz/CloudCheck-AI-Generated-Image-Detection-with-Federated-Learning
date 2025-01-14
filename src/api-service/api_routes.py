from flask import Blueprint, request, jsonify
from database import db
from models import APIKey, User
import secrets

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/api_keys/<int:user_id>', methods=['GET'])
def get_api_keys(user_id):
    api_keys = APIKey.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'name': key.name,
            'key': key.key,
            'created_at': key.created_at,
            'last_used': key.last_used,
            'usage_count': key.usage_count,
            'monthly_cost': f"${key.monthly_cost:.2f}"
        } for key in api_keys
    ])

@api_blueprint.route('/api_keys', methods=['POST'])
def create_api_key():
    data = request.json
    user_id = data.get('user_id')
    name = data.get('name')

    # Check if the user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Generate a new API key
    new_key = APIKey(
        key=f"sk_{secrets.token_hex(16)}",
        name=name,
        user_id=user_id
    )
    
    db.session.add(new_key)
    db.session.commit()

    return jsonify({'message': 'API key created', 'key': new_key.key})

@api_blueprint.route('/api_keys/<int:key_id>', methods=['DELETE'])
def delete_api_key(key_id):
    api_key = APIKey.query.get(key_id)
    if not api_key:
        return jsonify({'error': 'API key not found'}), 404

    db.session.delete(api_key)
    db.session.commit()

    return jsonify({'message': 'API key deleted'})