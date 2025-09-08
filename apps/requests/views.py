from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ContactRequest, LeadSource
from .serializers import ContactRequestSerializer,LeadSourceSerializer


class ContactRequestViewSet(viewsets.ModelViewSet):
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [AllowAny]


class LeadSourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeadSource.objects.all()
    serializer_class = LeadSourceSerializer
    permission_classes = [AllowAny]