from rest_framework.routers import DefaultRouter
from .views import ContactFooterViewSet, IconViewSet, PageBlockViewSet, ApplicationArticleViewSet, ServiceViewSet

router = DefaultRouter()
router.register(r'blocks', PageBlockViewSet, basename='pageblock')
router.register(r'application-articles', ApplicationArticleViewSet, basename='applicationarticle')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'footer', ContactFooterViewSet, basename='footer')
router.register(r'icons', IconViewSet, basename='icons')

urlpatterns = router.urls