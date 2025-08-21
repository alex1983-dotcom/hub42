from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ContactFooter
from .serializers import ContactFooterSerializer

class ContactFooterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset         = ContactFooter.objects.all()
    serializer_class = ContactFooterSerializer
    permission_classes = [AllowAny]