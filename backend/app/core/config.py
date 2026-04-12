from pydantic_settings import BaseSettings
from pydantic_settings import SettingsConfigDict



#Place holder settings for project
#To be read from .env file
#Dictionary must preserve same order as .env file !

class Settings(BaseSettings):
    #API INFORMATION
    app_name: str = "CareShieldAPI"
    app_env: str = "development"
    debug: bool = True
    api_prefix: str = "/api"

    #DATABASE
    database_url: str = "postgresql+psycopg://postgres:admin@localhost:5432/careshield"

    #------------------------------------------
    #JWT - MUST CHANGE KEY PRIOR TO HANDOVER!!!
    #------------------------------------------
    jwt_secret_key: str = "admin"
    jwt_algorithm: str = "HS256"
    access_token_expire_min: int = 720

    #AI MODELS
    ollama_url: str = "http://localhost:11434/api/generate"
    ollama_model: str = "qwen2.5:32b"
    whisper_model_size: str = "base"
    whisper_device: str = "cpu"
    whisper_compute_type: str = "int8"
    
    #TEMP UPLOADS DIRECTORY
    uloads_dir: str = "../uploads"

    model_config = SettingsConfigDict(env_file="../.env")

#use "app.config.settings" to access settings defined here
settings = Settings()