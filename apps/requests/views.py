from rest_framework import mixins, viewsets
from apps.core.permissions import OnlyWithApiKeyOrFromFrontend
from .models import ContactRequest, LeadSource, Reviews
from .serializers import ContactRequestSerializer, LeadSourceSerializer, ReviewCreateSerializer, ReviewSerializer
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


@method_decorator(
    ratelimit(key='ip', rate='2/m', method='POST', block=True),
    name='create'
)
class ReviewCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Оставить отзыв (POST)."""
    queryset = Reviews.objects.all()
    serializer_class = ReviewCreateSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]

    def perform_create(self, serializer):
        # is_published=False по умолчанию в модели
        serializer.save()


class ReviewPublicViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Reviews.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]