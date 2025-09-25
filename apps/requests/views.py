from rest_framework import mixins, viewsets
from apps.core.permissions import OnlyWithApiKeyOrFromFrontend
from .models import ContactRequest, LeadSource
from .serializers import ContactRequestSerializer, LeadSourceSerializer
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

@method_decorator(
    ratelimit(key='ip', rate='3/m', method='POST', block=True),
    name='create'          # только метод create (POST)
)
class ContactRequestViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Только POST-запросы (создание заявки)."""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]


class LeadSourceViewSet(viewsets.ReadOnlyModelViewSet):
    """Только чтение справочника."""
    queryset = LeadSource.objects.all()
    serializer_class = LeadSourceSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]

