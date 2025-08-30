from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ContactFooter, PageBlock, ApplicationArticle, Service, Icon
from .serializers import ContactFooterSerializer, IconSerializer, PageBlockSerializer, ApplicationArticleSerializer, PageServiceSerializer

from django.views.generic import TemplateView


class IndexView(TemplateView):
    # React-приложение собирается в `frontend/build/index.html`
    template_name = "index.html"

class IconViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/pages/icons/  – список всех активных иконок
    """
    queryset = Icon.objects.filter(is_active=True)
    serializer_class = IconSerializer
    permission_classes = [AllowAny]


class PageBlockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PageBlock.objects.filter(is_active=True).prefetch_related("items")
    serializer_class = PageBlockSerializer
    permission_classes = [AllowAny]


class ApplicationArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ApplicationArticle.objects.filter(is_published=True)
    serializer_class = ApplicationArticleSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]


# apps/pages/views.py
class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all().prefetch_related("roadmap_items", "offer_items")
    serializer_class = PageServiceSerializer
    permission_classes = [AllowAny]


class ContactFooterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactFooter.objects.all()
    serializer_class = ContactFooterSerializer
    permission_classes = [AllowAny]