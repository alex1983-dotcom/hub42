# Onboarding HUB42 - быстрый старт для нового разработчика

1. Стянуть репо  
2. Установить зависимости  
3. Создать `.env` (пример ниже)  
4. Применить миграции + загрузить фикстуры  
5. Запустить Django + React  

```bash
git clone git@github.com:yourname/hub42.git
cd hub42
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py loaddata fixtures/initial_data.json
python manage.py runserver

# во второй вкладке терминала
cd frontend && npm i && npm start
```

Swagger: http://127.0.0.1:8000/api/docs  
React:  http://127.0.0.1:3000