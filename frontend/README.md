# Документация для начала работ
0. Что лежит в репозитории
```
hub42/
├── config/                  # Django-конфигурация
│   ├── init.py
│   ├── settings/
│   │   ├── base.py
│   │   ├── production.py
│   │   └── development.py
│   ├── urls.py
│   └── wsgi.py
│
├── apps/                    # Django-приложения
│   ├── core/
│   ├── equipment/
│   ├── services/
│   ├── clients/
│   ├── blog/
│   └── requests/
│
├── templates/               # Django-шаблоны
├── static/                  # Django-статика
│
├── frontend/                ←  React-приложение
│   ├── node_modules/        # зависимости NPM
│   ├── public/              # index.html, favicon и т.д.
│   ├── src/                 # исходники React
│   │   ├── api/             # axios-инстансы, обёртки
│   │   ├── components/      # React-компоненты
│   │   ├── pages/           # страницы (роуты)
│   │   ├── styles/          # CSS / SCSS
│   │   ├── utils/           # хелперы
│   │   ├── App.js           # корневой компонент
│   │   └── index.js         # точка входа React
│   ├── .env.development     # переменные окружения
│   ├── package.json         # скрипты и зависимости
│   └── build/               # прод-бандл (после npm run build)
│
├── manage.py
└── requirements.txt
```

-------------------------------------------------
1. Установка Python 
-------------------------------------------------
1) Скачать с https://www.python.org/downloads/  
2) В установщике **обязательно поставить галку** «Add Python to PATH».  
3) Проверить в новой консоли:
```
python --version        # должно вывести 3.11 или выше
```

-------------------------------------------------
2. Клонировать репозиторий
-------------------------------------------------
```
https://github.com/alex1983-dotcom/hub42.git
cd hub42/
```

-------------------------------------------------
3. Поднять бэкенд (4 команды)
-------------------------------------------------
Открыть **первую** консоль:

```
Из корневой директории поекта hub42/
python -m venv venv
# Windows
venv\Scripts\activate

# установить все зависимости
pip install -r requirements.txt

# Выполнить миграции для активации базы данных
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
После `runserver` должно быть:
```
Starting development server at http://127.0.0.1:8000/
```

-------------------------------------------------
4. Поднять фронтенд (2 команды)
-------------------------------------------------
Открыть **вторую** консоль:

```
cd frontend
npm install
npm start
```
Откроется браузер http://localhost:3000.  
React уже настроен, можно ходить в `http://localhost:8000/api/...`.

-------------------------------------------------
5. Где смотреть документацию
-------------------------------------------------
Открыть в браузере:  
http://localhost:8000/api/docs  # Это Swagger - документация (автоматически обновляется)
Там все URL и примеры JSON.

-------------------------------------------------
6. Частые ошибки
-------------------------------------------------
• «CORS error» → убедись, что в `config/base.py` есть строки:
```python
CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]
```
(они уже добавлены в репо, просто проверь).  

• Если порт 8000 занят → закрой лишнее или запусти `python manage.py runserver 8001`.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
