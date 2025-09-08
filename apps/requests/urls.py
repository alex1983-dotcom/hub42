from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactRequestViewSet, LeadSourceViewSet

router = DefaultRouter()
router.register(r'contact-requests', ContactRequestViewSet, basename='contactrequest')
router.register(r'lead-sources', LeadSourceViewSet, basename='leadsource')

urlpatterns = [
    path('', include(router.urls)),
]