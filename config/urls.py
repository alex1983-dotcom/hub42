"""
Главный URL-модуль проекта hub42.
Настроены:
- административная панель
- загрузка картинок /mdeditor/ (для django-mdeditor)
- статические и медиа-файлы
- включение URL-карт всех приложений
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from rest_framework.permissions import AllowAny
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

admin.site.site_header = "Администрация HUB42"  # заголовок в верхней части страниц
admin.site.site_title = "HUB42 Admin"           # титул вкладки браузера
admin.site.index_title = "Добро пожаловать"     # заголовок на главной админки

class OpenSpectacularAPIView(SpectacularAPIView):
    permission_classes = [AllowAny]


class OpenSpectacularSwaggerView(SpectacularSwaggerView):
    permission_classes = [AllowAny]


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/pages/',     include('apps.pages.urls')),
    path('api/equipment/', include('apps.equipment.urls')),
    path('api/blog/',      include('apps.blog.urls')),
    path('api/requests/',  include('apps.requests.urls')),
    path('api/social/', include('apps.social.urls')),

    # Swagger / OpenAPI
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/',   SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # Media
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# React-SPA только в проде
if not settings.DEBUG:
    from apps.pages.views import IndexView
    urlpatterns += [path('', IndexView.as_view(), name='spa')]