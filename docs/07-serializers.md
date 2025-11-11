# Сериализаторы

- используем `ModelSerializer`  
- чтение: глубокий (`depth=1`) где нужно  
- запись: отдельный `CreateSerializer` при необходимости  
- поля `SerializerMethodField` только с `@extend_schema_field`

