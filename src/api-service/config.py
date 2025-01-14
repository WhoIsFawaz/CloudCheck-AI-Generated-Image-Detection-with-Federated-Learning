import os

#  Configurations
class Config:
    FLASK_HOST = "0.0.0.0"                                              # Flask host
    FLASK_PORT = "7001"                                                 # Flask port
    FLASK_THREADED = True                                               # Flask threaded option
    FLASK_DEBUG = True                                                  # Flask debug option
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_API_URL', 'mysql://root:P%40ssw0rd@localhost:3306/cloudcheck_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'veryverysecretdonttellanybody')

print(Config.SQLALCHEMY_DATABASE_URI)