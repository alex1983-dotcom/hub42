from rest_framework import viewsets, filters
from apps.core.permissions import OnlyWithApiKeyOrFromFrontend
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/equipment/products/          – список
    GET /api/equipment/products/<slug>/   – детально
    """
    queryset = (
        Product.objects.filter(is_published=True)
        .select_related('category', 'icon')
        .prefetch_related('images')
        .order_by('sort_order', '-created_at')
    )
    serializer_class = ProductSerializer
    permission_classes = [OnlyWithApiKeyOrFromFrontend]
    lookup_field = 'slug'
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']

