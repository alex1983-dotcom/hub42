from django.db import models
from apps.core.models import TimeStampedModel

class ContactFooter(TimeStampedModel):
    office_address = models.CharField(max_length=255)
    office_phone   = models.CharField(max_length=30, blank=True)
    service_address = models.CharField(max_length=255)
    service_phone   = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return "Footer contacts"