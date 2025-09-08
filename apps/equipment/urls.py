from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, DryerViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'dryers', DryerViewSet, basename='dryer')

urlpatterns = router.urls
