# apps/requests/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ContactRequestViewSet

router = DefaultRouter()
router.register(r'', ContactRequestViewSet, basename='contactrequest')

urlpatterns = router.urls