from rest_framework.routers import DefaultRouter
from .views import SocialLinkViewSet

router = DefaultRouter()
router.register('', SocialLinkViewSet, basename='social')
urlpatterns = router.urls
