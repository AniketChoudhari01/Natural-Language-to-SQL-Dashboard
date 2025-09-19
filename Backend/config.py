import os
from dotenv import load_dotenv

load_dotenv()

DB_PATH = "./ecommerce.db"
OPENAI_API_KEY = os.getenv("GEMINI_API_KEY")  # set in .env file
