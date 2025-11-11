# Фикстуры

Создать:
```bash
python -X utf8 manage.py dumpdata pages equipment blog requests --indent 2 -o fixtures/initial_data.json
```

Загрузить:
```bash
python manage.py loaddata fixtures/initial_data.json
```

Фронт-разработчик:
```bash
git pull
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata fixtures/initial_data.json