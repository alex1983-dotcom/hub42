# config/settings/base.py
"""
Базовые настройки проекта HUB42.
Все переменные окружения берутся из .env через `python-decouple`.
"""

from pathlib import Path
from decouple import config

# --------------------------------------------------
# 1. Базовые директории
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# --------------------------------------------------
# 2. Безопасность
# --------------------------------------------------
SECRET_KEY = config(
    "SECRET_KEY",
    default="django-insecure-change-me-in-dot-env",
)

ALLOWED_HOSTS = []  # Переопределяется в development.py / production.py

# --------------------------------------------------
# 3. Приложения Django
# --------------------------------------------------
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

# Сторонние пакеты
THIRD_PARTY_APPS = [
    "corsheaders",
    "rest_framework",
    "drf_spectacular",
    "django_ckeditor_5",
    "mdeditor",
    "django_extensions",
]

# Наши приложения
LOCAL_APPS = [
    "apps.core",
    "apps.equipment",
    "apps.services",
    "apps.blog",
    "apps.requests",
    "apps.pages",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# --------------------------------------------------
# 4. Middleware
# --------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# --------------------------------------------------
# 5. URL-конфигурация
# --------------------------------------------------
ROOT_URLCONF = "config.urls"

# --------------------------------------------------
# 6. Шаблоны
# --------------------------------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "templates",
            BASE_DIR / "frontend" / "build",  # React production build
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# --------------------------------------------------
# 7. WSGI / ASGI
# --------------------------------------------------
WSGI_APPLICATION = "config.wsgi.application"

# --------------------------------------------------
# 8. База данных
#     Переопределяется в development.py / production.py
# --------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# --------------------------------------------------
# 9. Пароли / валидация
# --------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# --------------------------------------------------
# 10. Интернационализация
# --------------------------------------------------
LANGUAGE_CODE = "ru-ru"
TIME_ZONE = "Europe/Moscow"
USE_I18N = True
USE_TZ = True

# --------------------------------------------------
# 11. Статика и медиа
# --------------------------------------------------
STATIC_URL = "/static/"
STATICFILES_DIRS = [
    BASE_DIR / "static",
    BASE_DIR / "frontend" / "build" / "static",  # React static files
]
STATIC_ROOT = BASE_DIR / "staticfiles"  # для collectstatic

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# --------------------------------------------------
# 12. Поля моделей по-умолчанию
# --------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --------------------------------------------------
# 13. Django REST Framework
# --------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_PARSER_CLASSES": ["rest_framework.parsers.JSONParser"],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# --------------------------------------------------
# 14. CORS (для React dev-сервера)
# --------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# --------------------------------------------------
# 15. DRF-Spectacular (Swagger/OpenAPI)
# --------------------------------------------------
SPECTACULAR_SETTINGS = {
    "TITLE": "HUB42 API",
    "DESCRIPTION": "Документация REST API проекта HUB42",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

# --------------------------------------------------
# MDEditor
# --------------------------------------------------

# ----------------------------------------------------------------------
# 19. MDEditor  (Markdown-редактор)
# ----------------------------------------------------------------------
MDEDITOR_CONFIGS = {
    "default": {
        "language": "en",
        "width": "100%",
        "height": 500,
        "toolbar": [
            "undo", "redo", "|",
            "bold", "del", "italic", "quote", "|",
            "h1", "h2", "h3", "|",
            "list-ul", "list-ol", "hr", "|",
            "link", "image", "code", "table", "|",
            "watch", "preview", "fullscreen"
        ],
        "upload_image_formats": ["jpg", "jpeg", "png", "gif", "svg"],
        "image_folder": "uploads/mdeditor",
        "theme": "default",          # default / dark
        "preview_theme": "default",  # тема предпросмотра
        "editor_theme": "default",   # тема редактора
        "toolbar_autofixed": True,
        "search_replace": True,
        "emoji": False,
        "tex": True,                 # поддержка $$...$$ формул
        "flow_chart": False,
        "sequence": False,
    }
}

# # путь для загрузки картинок из редактора
# MEDIA_URL = "/media/"
# MEDIA_ROOT = BASE_DIR / "media"


# --------------------------------------------------
# 16. CKEditor 5
# --------------------------------------------------
CKEDITOR_5_CONFIGS = {
    "default": {
        "toolbar": [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
        ],
    },
}

# --------------------------------------------------
# 17. Email (закомментировано до необходимости)
# --------------------------------------------------
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# EMAIL_HOST = config("EMAIL_HOST", default="smtp.yandex.ru")
# EMAIL_PORT = config("EMAIL_PORT", default=465, cast=int)
# EMAIL_USE_SSL = config("EMAIL_USE_SSL", default=True, cast=bool)
# EMAIL_HOST_USER = config("EMAIL_HOST_USER")
# EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
# DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# --------------------------------------------------
# 18. Кеш / Redis / S3 — место для будущих настроек
# --------------------------------------------------
# CACHES = {...}
# STORAGES = {...}