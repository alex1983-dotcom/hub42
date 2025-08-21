from django.db import models
from apps.core.models import TimeStampedModel

class Service(TimeStampedModel):
    SERVICE_TYPES = (
        ('implementation', 'Внедрение 3D-принтера'),
        ('custom_equipment', 'Разработка оборудования под ключ'),
    )
    title = models.CharField(max_length=200)
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES)
    description = models.TextField()

    def __str__(self):
        return self.title