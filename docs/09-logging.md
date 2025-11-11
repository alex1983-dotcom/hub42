# Логирование

- ПК: папка `logs/`, RotatingFileHandler 5 × 5 МБ  
- Прод: `/var/log/hub42/`, systemd-unit, logrotate ежедневно  
- Уровень WARNING в проде, INFO включается флагом `ENABLE_INFO_LOG=1`

