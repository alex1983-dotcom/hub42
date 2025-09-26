from rest_framework import viewsets, filters
from apps.core.permissions import OnlyWithApiKeyOrFromFrontend
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/blog/?ordering=-published_at   # новые первые
    GET /api/blog/?ordering=title          # по алфавиту
    GET /api/blog/<slug>/                  # детально
    """
    queryset = Post.objects.published()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = [OnlyWithApiKeyOrFromFrontend]

    # включаем сортировку
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['published_at', 'title', 'created_at']
    ordering = ['-published_at']
