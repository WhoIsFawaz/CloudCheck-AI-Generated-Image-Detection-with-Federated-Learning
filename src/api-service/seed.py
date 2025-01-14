from app import create_app
from database import db
from models import User, APIKey
import secrets
from datetime import datetime

# Initialize the Flask app and database context
app = create_app()
app.app_context().push()  # Push the app context to allow db operations

def seed_data():
    # Clear existing data (only do this in a development environment)
    db.drop_all()
    db.create_all()

    # Seed Users
    users = [
        User(Username="jdoe", Name="John Doe", Email="jdoe@mail.com", Password="password"),
        User(Username="asmith", Name="Alice Smith", Email="asmith@mail.com", Password="password"),
        User(Username="bjones", Name="Bob Jones", Email="bjones@mail.com", Password="password"),
    ]

    # Add users to the database
    db.session.add_all(users)
    db.session.commit()

    # Retrieve the created users
    user1, user2, user3 = User.query.all()

    # Seed API Keys for each user
    api_keys = [
        APIKey(
            key=f"sk_1cb8229474905bf50e93f1f0cd97d191",
            name="Production API Key",
            created_at=datetime.utcnow(),
            last_used=datetime.utcnow(),
            usage_count=3290,
            monthly_cost=11015 * 0.005,
            user_id=user1.UserID
        ),
        APIKey(
            key=f"sk_969971ac3366b9a2e314f453e25cfdeb",
            name="Development API Key",
            created_at=datetime.utcnow(),
            last_used=datetime.utcnow(),
            usage_count=11015,
            monthly_cost=11015 * 0.005,
            user_id=user2.UserID
        ),
        APIKey(
            key=f"sk_6bb619c4a9585bcbe671c6a42406c015",
            name="Testing API Key",
            created_at=datetime.utcnow(),
            last_used=datetime.utcnow(),
            usage_count=15352,       # Simulate some usage
            monthly_cost=15352 * 0.005,  # Assuming cost per request is $0.005
            user_id=user3.UserID
        )
    ]

    # Add API keys to the database
    db.session.add_all(api_keys)
    db.session.commit()

    print("Seed data inserted successfully.")

# Run the seed function
if __name__ == "__main__":
    seed_data()
