from rest_framework.routers import DefaultRouter
from .views import ContactFooterViewSet

router = DefaultRouter()
router.register(r'footer', ContactFooterViewSet, basename='footer')

urlpatterns = router.urls