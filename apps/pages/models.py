# apps/pages/models.py
from django.db import models
from django.utils.html import strip_tags
from apps.core.models import TimeStampedModel
from mdeditor.fields import MDTextField
from django.utils import timezone

class PageBlock(TimeStampedModel):
    """
    Каждая запись = один видимый «блок» на главной
    """
    BLOCK_TYPES = (
        ('hero',           'Шапка сайта'),                 # большой баннер сверху
        ('printers_intro', 'Промышленные 3D принтеры'),    # текст+иллюстрация
        ('applications',   'Сферы применения'),            # 5 иконок с текстом
        ('products',       'Продукция'),                   # карточки принтеров
        ('advantages',     'Почему это выгоднее'),         # список плюсов
        ('services',       'Наши услуги'),                 # 4 карточки услуг
        ('faq',            'FAQ'),                         # вопрос-ответ
    )

    block_type = models.CharField(
        max_length=20,
        choices=BLOCK_TYPES,
        unique=True,
        verbose_name="Тип блока"
    )
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    subtitle = models.CharField(max_length=500, blank=True, verbose_name="Подзаголовок")
    content = models.TextField(blank=True, verbose_name="Доп. текст / HTML")
    is_active = models.BooleanField(default=True, verbose_name="Показывать")
    sort_order = models.PositiveIntegerField(default=0, verbose_name="Порядок")

    class Meta:
        verbose_name = "Блок главной"
        verbose_name_plural = "Блоки главной"
        ordering = ["sort_order"]

    def __str__(self):
        return f"{self.get_block_type_display()}"


class BlockItem(TimeStampedModel):
    """
    Элемент внутри блока: иконка + текст (applications / advantages / services / faq)
    """
    parent_block = models.ForeignKey(
        PageBlock,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name="Блок-родитель"
    )
    title = models.CharField(max_length=255, verbose_name="Заголовок / Вопрос", blank=True)
    content = models.TextField(verbose_name="Описание / Ответ", blank=True)   # то, что ниже заголовка
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="CSS-класс FontAwesome, например: 'fas fa-industry'",
        verbose_name="Иконка"
    )
    sort_order = models.PositiveIntegerField(default=0, verbose_name="Порядок")

    class Meta:
        verbose_name = "Элемент"
        verbose_name_plural = "Элементы"
        ordering = ["sort_order"]

    def __str__(self):
        return f"{self.parent_block} — {self.title}"


class ApplicationArticle(TimeStampedModel):
    """Полноценная статья для раздела «Сферы применения»"""
    title = models.CharField(max_length=255, verbose_name="Название статьи")
    slug = models.SlugField(unique=True, verbose_name="URL")
    preview = models.TextField(max_length=500, verbose_name="Анонс")
    body = MDTextField(verbose_name="Текст статьи")
    image = models.ImageField(upload_to="applications/", blank=True, verbose_name="Обложка")
    is_published = models.BooleanField(default=True, verbose_name="Опубликовано")
    published_at = models.DateTimeField(blank=True, null=True, verbose_name="Дата публикации")
    sort_order = models.PositiveIntegerField(default=0, verbose_name="Порядок")

    # связь с BlockItem
    related_item = models.OneToOneField(
        BlockItem,
        on_delete=models.CASCADE,
        related_name="article",
        limit_choices_to={'parent_block__block_type': 'applications'},
        verbose_name="Связанный элемент"
    )

    class Meta:
        verbose_name = "Статья «Сферы применения»"
        verbose_name_plural = "Статьи «Сферы применения»"
        ordering = ["sort_order", "-published_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse("pages:application_article", kwargs={"slug": self.slug})


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