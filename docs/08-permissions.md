# Права доступа

## OnlyWithApiKeyOrFromFrontend
1. Проверяет заголовок `X-API-KEY` или `?key=...`  
2. Или смотрит `Origin / Referer` на `localhost:3000`, `127.0.0.1:3000`, `localhost:8000`  
3. Иначе 403

## DocsOrApiKey
- `/api/schema/` и `/api/docs/` всегда открыты  
- остальное – по правилу выше

