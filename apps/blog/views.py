from rest_framework import viewsets, filters
from apps.blog.search import TrigramSearchFilter         # ← новый фильтр
from apps.core.permissions import OnlyWithApiKeyOrFromFrontend
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.published()
    serializer_class = PostSerializer
    lookup_field = "slug"
    permission_classes = [OnlyWithApiKeyOrFromFrontend]

    filter_backends = [TrigramSearchFilter, filters.OrderingFilter]
    ordering_fields = ["published_at", "title"]
    ordering = ["-published_at"]
