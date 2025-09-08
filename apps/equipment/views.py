from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Category, Product, Dryer
from .serializers import CategorySerializer, ProductSerializer, DryerSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_published=True)\
                              .select_related('category')\
                              .prefetch_related('images')\
                              .order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class DryerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Dryer.objects.filter(is_published=True)\
                            .prefetch_related('compatible_printers')\
                            .order_by('sort_order', '-created_at')
    serializer_class = DryerSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'