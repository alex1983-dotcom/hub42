from django.db import models
from apps.core.models import TimeStampedModel

class Category(TimeStampedModel):
    name = models.CharField(max_length=64, verbose_name="Название")

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name="Категория"
    )
    name = models.CharField(max_length=128, verbose_name="Название")
    tagline = models.CharField(max_length=256, blank=True, verbose_name="Слоган")
    description = models.TextField(verbose_name="Описание")
    image = models.ImageField(upload_to="equipment/", verbose_name="Изображение")
    is_published = models.BooleanField(default=True, verbose_name="Опубликовано")

    max_temperature = models.PositiveIntegerField("Макс. температура °C", default=300)
    build_volume = models.CharField("Рабочая область", max_length=32, blank=True)
    price = models.PositiveIntegerField("Цена, ₽", default=0)

    class Meta:
        verbose_name = "3D-принтер"
        verbose_name_plural = "3D-принтеры"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name