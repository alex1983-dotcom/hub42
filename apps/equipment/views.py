from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/equipment/products/          – список
    GET /api/equipment/products/<id>/     – детально
    """
    queryset = Product.objects.filter(is_published=True).select_related('category').order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

