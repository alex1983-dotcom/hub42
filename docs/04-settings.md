# Настройки

- `base.py` – общие переменные  
- `development.py` – SQLite, консоль-логи, DEBUG=True  
- `production.py` – MySQL, ротация логов, SMTP, HTTPS-only  

Переключение через `DJANGO_SETTINGS_MODULE`:

```bash
export DJANGO_SETTINGS_MODULE=config.settings.development
# или
gunicorn config.wsgi:application --env DJANGO_SETTINGS_MODULE=config.settings.production