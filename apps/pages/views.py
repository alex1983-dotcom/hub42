from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ContactFooter, PageBlock, ApplicationArticle
from .serializers import ContactFooterSerializer, PageBlockSerializer, ApplicationArticleSerializer

from django.views.generic import TemplateView


class IndexView(TemplateView):
    # React-приложение собирается в `frontend/build/index.html`
    template_name = "index.html"


class PageBlockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PageBlock.objects.filter(is_active=True).prefetch_related("items")
    serializer_class = PageBlockSerializer
    permission_classes = [AllowAny]


class ApplicationArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ApplicationArticle.objects.filter(is_published=True)
    serializer_class = ApplicationArticleSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]


class ContactFooterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactFooter.objects.all()
    serializer_class = ContactFooterSerializer
    permission_classes = [AllowAny]