from .base import *
from pathlib import Path

DEBUG = False
ALLOWED_HOSTS = ["hub42.ru", "www.hub42.ru"]   # Временно

# Абсолютный каталог для логов
LOG_DIR = Path("/var/log/hub42")
LOG_DIR.mkdir(mode=0o755, exist_ok=True)

# Переопределяем LOGGING
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {asctime} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "simple",
            "level": "WARNING",
        },
        "file_info": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOG_DIR / "django.log",
            "maxBytes": 5 * 1024 * 1024,  # 5 MB
            "backupCount": 5,
            "formatter": "verbose",
            "level": "WARNING",
        },
        "file_error": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOG_DIR / "error.log",
            "maxBytes": 5 * 1024 * 1024,
            "backupCount": 5,
            "formatter": "verbose",
            "level": "ERROR",
        },
    },
    "root": {
        "handlers": ["console", "file_info", "file_error"],
        "level": "WARNING",
    },
    "loggers": {
        "django": {
            "handlers": ["file_info"],
            "level": "WARNING",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["file_error"],
            "level": "ERROR",
            "propagate": False,
        },
        "rest_framework": {
            "handlers": ["file_info"],
            "level": "WARNING",
            "propagate": False,
        },
    },
}

# Подключение к базе данных
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": config("DB_NAME", default="hub42"),
        "USER": config("DB_USER", default="hub42"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config("DB_HOST", default="127.0.0.1"),
        "PORT": config("DB_PORT", default="3306"),
        "OPTIONS": {
            "charset": "utf8mb4",
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

# Уведомление по почте админу при ERROR или Critical (пока опционально)
ADMINS = [("Your Name", "your@mail.ru")]
SERVER_EMAIL = "errors@hub42.ru"
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.yandex.ru"
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD") # Нужен пароль приложения