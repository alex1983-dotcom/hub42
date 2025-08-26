from django.db import models
from apps.core.models import TimeStampedModel

class ContactRequest(TimeStampedModel):
    name = models.CharField(max_length=128, verbose_name="Имя")
    email = models.EmailField(verbose_name="Электронная почта")
    phone = models.CharField(max_length=32, blank=True, verbose_name="Телефон")
    company = models.CharField(max_length=128, blank=True, verbose_name="Компания")
    message = models.TextField(blank=True, verbose_name="Текст заявки")
    is_processed = models.BooleanField(default=False, verbose_name="Обработано")

    class Meta:
        verbose_name = "Заказчик"
        verbose_name_plural = "Заказчики"

    def __str__(self):
        return f"{self.name} ({self.company})"