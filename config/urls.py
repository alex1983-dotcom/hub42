"""
Главный URL-модуль проекта hub42.
Настроены:
- административная панель
- загрузка картинок /mdeditor/ (для django-mdeditor)
- статические и медиа-файлы
- включение URL-карт всех приложений
"""

# from django.contrib import admin
# from django.urls import path, include
# from django.conf import settings
# from django.conf.urls.static import static
#
# # Основные маршруты
# urlpatterns = [
#     # Административная панель
#     path("admin/", admin.site.urls),
#
#     # Путь для загрузки изображений и файлов через django-mdeditor
#     # Без него редактор не сможет сохранять картинки
#     path("mdeditor/", include("mdeditor.urls")),
#
#     # Приложения
#     path("",          include("apps.pages.urls")),      # главная и статические страницы
#     path("catalog/",  include("apps.equipment.urls")),  # каталог принтеров
#     path("services/", include("apps.services.urls")),   # услуги
#     path("blog/",     include("apps.blog.urls")),       # статьи
#     path("requests/", include("apps.requests.urls")),   # заявки
# ]
#
# # Раздача медиа-файлов в режиме DEBUG
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
]

# Раздаём медиа и статику только в DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)