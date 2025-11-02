from rest_framework import viewsets
from .models import SocialLink
from .serializers import SocialLinkSerializer
from apps.core.permissions import OnlyWithApiKeyOrFromFrontend


class SocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialLink.objects.filter(is_active=True)
    serializer_class = SocialLinkSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]


