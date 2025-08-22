from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ContactFooter
from .serializers import ContactFooterSerializer

from django.views.generic import TemplateView

class IndexView(TemplateView):
    # React-приложение собирается в `frontend/build/index.html`
    template_name = "index.html"

class ContactFooterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactFooter.objects.all()
    serializer_class = ContactFooterSerializer
    permission_classes = [AllowAny]