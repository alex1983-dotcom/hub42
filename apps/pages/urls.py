from rest_framework.routers import DefaultRouter
from .views import ContactFooterViewSet, PageBlockViewSet

router = DefaultRouter()
router.register(r'blocks', PageBlockViewSet, basename='pageblock')
router.register(r'footer', ContactFooterViewSet, basename='footer')

urlpatterns = router.urls