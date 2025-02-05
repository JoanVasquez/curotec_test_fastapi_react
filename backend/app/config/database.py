import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.utils.ssm_util import get_cached_parameter

if "test" in sys.argv or os.environ.get("DJANGO_ENV") in ["local", "test"]:
    # Use SQLite for testing or local development
    DATABASE_URL = "sqlite:///./test.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    # Retrieve the PostgreSQL connection parameters using get_cached_parameter.
    DB_NAME = get_cached_parameter(os.getenv("DB_NAME"))
    DB_USER = get_cached_parameter(os.getenv("DB_USER"))
    DB_PASSWORD = get_cached_parameter(os.getenv("DB_PASSWORD"))
    DB_HOST = get_cached_parameter(os.getenv("DB_HOST"))
    DB_PORT = get_cached_parameter(os.getenv("DB_PORT"))

    DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

