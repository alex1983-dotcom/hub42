# config/settings/development.py
from .base import *
import pathlib

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# --- обнуляем логи ПЕРЕД созданием хэндлеров ----------
LOG_DIR = BASE_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)
for log_name in ("django.log", "drf.log"):
    pathlib.Path(LOG_DIR / log_name).write_text("", encoding="utf-8")
# -------------------------------------------------------

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": LOG_DIR / "django.log",
            "mode": "a",  # append, но файл уже пустой
            "encoding": "utf-8",
            "formatter": "verbose",
        },
        "drf_file": {
            "level": "WARNING",
            "class": "logging.FileHandler",
            "filename": LOG_DIR / "drf.log",
            "mode": "a",  # append, но файл уже пустой
            "encoding": "utf-8",
            "formatter": "verbose",
        },
    },
    "root": {
        "handlers": ["console", "file"],
        "level": "INFO",
    },
    "loggers": {
        "django": {
            "handlers": ["file"],
            "level": "INFO",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["file"],
            "level": "ERROR",
            "propagate": False,
        },
        "rest_framework": {
            "handlers": ["drf_file"],
            "level": "WARNING",
            "propagate": False,
        },
    },
}

# ---------- выключаем INFO-логи запросов ----------
LOGGING['loggers']['django.server'] = {
    'handlers': ['console'],
    'level': 'WARNING',   # ← INFO не пишем
    'propagate': False,
}

# ------------- Настройки CORS ---------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

