from rest_framework import viewsets
from apps.core.permissions import OnlyWithApiKeyOrFromFrontend
from .models import ContactFooter, PageBlock, ApplicationArticle, Service, Icon, BlockItem
from .serializers import ContactFooterSerializer, IconSerializer, PageBlockSerializer, ApplicationArticleSerializer, PageServiceSerializer
from django.db.models import Prefetch
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
    permission_classes = [OnlyWithApiKeyOrFromFrontend]


class PageBlockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PageBlock.objects.filter(is_active=True).prefetch_related(
        Prefetch('items', queryset=BlockItem.objects.filter(is_active=True))
    )

    serializer_class = PageBlockSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]


class ApplicationArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ApplicationArticle.objects.filter(is_published=True)
    serializer_class = ApplicationArticleSerializer
    lookup_field = 'slug'
    permission_classes = [OnlyWithApiKeyOrFromFrontend]


# apps/pages/views.py
class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all().prefetch_related("roadmap_items", "offer_items")
    serializer_class = PageServiceSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]


class ContactFooterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactFooter.objects.all()
    serializer_class = ContactFooterSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]

