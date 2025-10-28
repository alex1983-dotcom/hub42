from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactRequestViewSet, LeadSourceViewSet, ReviewPublicViewSet, ReviewCreateViewSet

router = DefaultRouter()
router.register(r'contact-requests', ContactRequestViewSet, basename='contactrequest')
router.register(r'lead-sources', LeadSourceViewSet, basename='leadsource')
router.register(r'reviews', ReviewPublicViewSet, basename='review-public')
router.register(r'leave-review', ReviewCreateViewSet, basename='review-create')

urlpatterns = [
    path('', include(router.urls)),
]
