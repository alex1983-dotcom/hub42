from django.db import models
from apps.core.models import TimeStampedModel

class Category(TimeStampedModel):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

class Product(TimeStampedModel):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=128)
    tagline = models.CharField(max_length=256, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to="equipment/")
    is_published = models.BooleanField(default=True)

    # ===== новые поля «принтера» =====
    max_temperature = models.PositiveIntegerField("Макс. температура °C", default=300)
    build_volume = models.CharField("Рабочая область", max_length=32, blank=True)
    price = models.PositiveIntegerField("Цена, ₽", default=0)

    def __str__(self):
        return self.name