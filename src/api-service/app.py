from flask import Flask, request, redirect, render_template, flash
from database import db, init_db
from config import Config
from models import APIKey, User
from api_routes import api_blueprint
from image_checker_routes import image_checker_blueprint
from datetime import datetime
import secrets
import pymysql

pymysql.install_as_MySQLdb()

@api_blueprint.route('/')
def index():
    return render_template('index.html')

@api_blueprint.route('/test_api_keys', methods=['GET', 'POST'])
def test_api_keys():
    if request.method == 'POST':
        # Handle creation of API key
        user_id = request.form.get('user_id')
        name = request.form.get('name')

        # Check if the user exists
        user = User.query.get(user_id)
        if not user:
            flash('User not found.', 'danger')
            return redirect('/')

        # Generate a new API key
        new_key = APIKey(
            key=f"sk_{secrets.token_hex(16)}",
            name=name,
            created_at=datetime.utcnow(),
            user_id=user_id
        )
        
        db.session.add(new_key)
        db.session.commit()
        flash('API key created successfully.', 'success')
        return redirect('/')

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)
    app.register_blueprint(api_blueprint)
    app.register_blueprint(image_checker_blueprint)
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host=Config.FLASK_HOST, port=Config.FLASK_PORT, threaded=Config.FLASK_THREADED, debug=Config.FLASK_DEBUG)