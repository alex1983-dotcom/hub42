from rest_framework.routers import DefaultRouter
from .views import ContactFooterViewSet, PageBlockViewSet, ApplicationArticleViewSet

router = DefaultRouter()
router.register(r'blocks', PageBlockViewSet, basename='pageblock')
router.register(r'application-articles', ApplicationArticleViewSet, basename='applicationarticle')
router.register(r'footer', ContactFooterViewSet, basename='footer')

urlpatterns = router.urls