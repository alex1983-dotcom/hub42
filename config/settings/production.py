# config/settings/production.py
"""
Боевые настройки HUB42.
MySQL 8, логи WARNING+, опциональный INFO-хендлер для отладки.
Всё секретное через python-decouple.
"""
from .base import *
from pathlib import Path
from decouple import config

# --------------- базовые ---------------------------------------------------
DEBUG = False
ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=lambda v: [s.strip() for s in v.split(",")])

# --------------- MySQL -----------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": config("DB_NAME"),
        "USER": config("DB_USER"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config("DB_HOST", default="127.0.0.1"),
        "PORT": config("DB_PORT", default="3306"),
        "OPTIONS": {
            "charset": "utf8mb4",
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

# --------------- логирование --------------------------------------------------
LOG_DIR = Path(config("LOG_DIR", default="/var/log/hub42"))
LOG_DIR.mkdir(mode=0o755, exist_ok=True)

# общий формат
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {"format": "{levelname} {message}", "style": "{"},
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
            "maxBytes": 10 * 1024 * 1024,  # 10 МБ
            "backupCount": 5,
            "formatter": "verbose",
            "level": "WARNING",
        },
        "file_error": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOG_DIR / "error.log",
            "maxBytes": 10 * 1024 * 1024,
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

# опциональный INFO-хендлер (1 день, 10 МБ)
if config("ENABLE_INFO_LOG", default=False, cast=bool):
    LOGGING["handlers"]["info_file"] = {
        "class": "logging.handlers.RotatingFileHandler",
        "filename": LOG_DIR / "info.log",
        "maxBytes": 10 * 1024 * 1024,
        "backupCount": 1,  # храним 1 сутки
        "formatter": "verbose",
        "level": "INFO",
    }
    # цепляем к корневому логгеру
    LOGGING["root"]["handlers"].append("info_file")

# после создания файла сразу закрываем права 640
# делаем маленький хук (опц.)
if ENABLE_INFO_LOG := config("ENABLE_INFO_LOG", default=False, cast=bool):

    def _set_info_perms():
        try:
            (LOG_DIR / "info.log").chmod(0o640)
        except FileNotFoundError:
            pass

    # вызовем после конфигурации
    import atexit
    atexit.register(_set_info_perms)

# --------------- почта админам при ERROR -------------------------------------
ADMINS = [(config("ADMIN_NAME", default="Admin"), config("ADMIN_EMAIL"))]
SERVER_EMAIL = config("SERVER_EMAIL", default="errors@hub42.ru")
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = config("EMAIL_HOST", default="smtp.yandex.ru")
EMAIL_PORT = config("EMAIL_PORT", default=465, cast=int)
EMAIL_USE_SSL = True
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")

# --------------- статика / медиа ---------------------------------------------
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_ROOT = BASE_DIR / "media"


# --------------- безопасность -------------------------------------------------
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True