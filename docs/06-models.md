# Ключевые модели

## Post (blog)
- title, slug, preview, body (Markdown), image, status, published_at  
- менеджер `.published()`

## Product (equipment)
- объединяет принтеры и сушилки (product_type)  
- категория, цена, галерея, 30+ технических полей  
- related_name='images' → ProductImage

## PageBlock + BlockItem (pages)
- блоки главной страницы  
- элементы = иконка + заголовок + текст  
- is_system – защита от удаления

