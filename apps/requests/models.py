from django.db import models
from apps.core.models import TimeStampedModel


class LeadSource(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Справочник")

    class Meta:
        verbose_name = "Список - откуда узнали"
        verbose_name_plural = "Списки - откуда узнали"

    def __str__(self):
        return self.name


class ContactRequest(TimeStampedModel):
    name = models.CharField(max_length=128, verbose_name="Имя")
    email = models.EmailField(verbose_name="Электронная почта")
    phone = models.CharField(max_length=32, blank=True, verbose_name="Телефон")
    company = models.CharField(max_length=128, blank=True, verbose_name="Компания")
    lead_source = models.ForeignKey(LeadSource, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Откуда узнали о нас")
    message = models.TextField(blank=True, verbose_name="Текст заявки")
    is_processed = models.BooleanField(default=False, verbose_name="Обработано")

    class Meta:
        verbose_name = "Заказчик"
        verbose_name_plural = "Заказчики"

    def __str__(self):
        return f"{self.name} ({self.company})"
    