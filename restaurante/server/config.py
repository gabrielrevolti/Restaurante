from dotenv import load_dotenv
import os
import redis 

load_dotenv()

class AplicationConfig:
  SECRET_KEY = os.environ['SECRET_KEY']
  SESSION_TYPE = "redis"
  SESSION_PERMANENT = False
  SESSION_USE_SIGNER = True
  SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")