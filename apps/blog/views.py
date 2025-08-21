from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/blog/           — список
    GET /api/blog/<slug>/    — детально
    """
    queryset = Post.objects.published()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]