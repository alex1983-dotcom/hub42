from django.db import models
from apps.core.models import TimeStampedModel
from mdeditor.fields import MDTextField


class ContactFooter(TimeStampedModel):
    """
    Контент футера
    """
    title = models.CharField(max_length=255, verbose_name="Заголовок футера")
    office_address = models.CharField(max_length=255, verbose_name="Адрес офиса")
    office_phone = models.CharField(max_length=30, blank=True, verbose_name="Телефон офиса")
    service_address = models.CharField(max_length=255, verbose_name="Адрес сервисного центра")
    service_phone = models.CharField(max_length=30, blank=True, verbose_name="Телефон сервисного центра")
    user_agreement = MDTextField("Пользовательское соглашение")

    class Meta:
        verbose_name = "Данные футера"
        verbose_name_plural = "Данные футера"

    def __str__(self):
        return "Futer contact"