from django.db import models
from apps.core.models import TimeStampedModel

class ContactRequest(TimeStampedModel):
    name = models.CharField(max_length=128)
    email = models.EmailField()
    phone = models.CharField(max_length=32, blank=True)
    company = models.CharField(max_length=128, blank=True)
    message = models.TextField(blank=True)
    is_processed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.company})"