from datetime import datetime
from database import db

class User(db.Model):
    __tablename__ = 'User'

    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Username = db.Column(db.String(255), unique=True, nullable=False)
    Name = db.Column(db.String(255), nullable=False)
    Email = db.Column(db.String(255), unique=True, nullable=False)
    Password = db.Column(db.String(255), nullable=False)

    # Relationship with API keys
    api_keys = db.relationship('APIKey', backref='User', lazy=True)

class APIKey(db.Model):
    __tablename__ = 'API_Key'

    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(64), unique=True, nullable=False, index=True)
    name = db.Column(db.String(64), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_used = db.Column(db.DateTime, nullable=True)
    usage_count = db.Column(db.Integer, default=0)
    monthly_cost = db.Column(db.Float, default=0.0)

    # Foreign key linking to User table
    user_id = db.Column(db.Integer, db.ForeignKey('User.UserID'), nullable=False)

    def increment_usage(self, cost_per_request=0.005):
        """Updates the usage statistics for the API key."""
        self.usage_count += 1
        self.monthly_cost += cost_per_request
        self.last_used = datetime.utcnow()
        db.session.commit()
