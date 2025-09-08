from django.db import models
from django.urls import reverse
from apps.core.models import TimeStampedModel


class Category(TimeStampedModel):
    name = models.CharField(max_length=64, verbose_name="Название")
    slug = models.SlugField(unique=True, verbose_name="URL")

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("equipment:category-detail", kwargs={"slug": self.slug})


class Product(TimeStampedModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name="Категория"
    )
    name = models.CharField(max_length=128, verbose_name="Название")
    slug = models.SlugField(unique=True, verbose_name="URL")
    tagline = models.CharField(max_length=256, blank=True, verbose_name="Слоган")
    description = models.TextField(verbose_name="Описание")
    image = models.ImageField(upload_to="equipment/", verbose_name="Изображение-обложка")
    is_published = models.BooleanField(default=True, verbose_name="Опубликовано")

    volume_construction = models.CharField("Объём построения", max_length=125, blank=True)
    extruders_count = models.CharField("Кол-во экструдеров", max_length=125, blank=True)
    bed_max_temp = models.PositiveIntegerField("Температура стола, °C", blank=True, null=True)
    layer_thickness = models.CharField("Толщина слоя, мм", max_length=125, blank=True)
    filament_diameter = models.CharField("Диаметр сопел, мм", max_length=125, blank=True)
    print_speed = models.CharField("Скорость печати", max_length=125, blank=True)
    positioning_accuracy = models.CharField("Позиционирование (XY/Z)", max_length=64, blank=True)
    surface_of_site = models.CharField("Поверхность площадки", max_length=350, blank=True)
    control = models.CharField("Управление", max_length=128, blank=True)
    software = models.CharField("Операционная система", max_length=256, blank=True)
    dimensions = models.CharField("Габариты (Д×Ш×В), мм", max_length=64, blank=True)
    weight = models.CharField("Масса, кг", max_length=125, blank=True, null=True)
    energy_consumption = models.CharField("Энергопотребление", max_length=125, blank=True)
    materials = models.TextField("Материалы", blank=True)
    guarantee = models.CharField("Гарантия", max_length=128, blank=True)
    power_supply = models.CharField("Питание", max_length=125, blank=True)
    additionally = models.TextField("Дополнительно", blank=True)
    price = models.PositiveIntegerField("Цена, р.", default=0)

    class Meta:
        verbose_name = "3D-принтер"
        verbose_name_plural = "3D-принтеры"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("equipment:product-detail", kwargs={"slug": self.slug})


class Dryer(TimeStampedModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='dryers',
        verbose_name="Категория"
    )
    name = models.CharField(max_length=128, verbose_name="Название")
    slug = models.SlugField(unique=True, verbose_name="URL")
    short_desc = models.CharField(max_length=200, blank=True, verbose_name="Краткое описание")
    description = models.TextField(blank=True, verbose_name="Полное описание")
    image = models.ImageField(upload_to="dryers/", blank=True, verbose_name="Обложка")

    capacity_spools = models.PositiveSmallIntegerField(default=12, verbose_name="Вместимость катушек, шт")
    purpose = models.CharField("Назначение", max_length=255, blank=True)
    heating_type = models.CharField("Нагрев камеры", max_length=255, blank=True)
    layer_thickness = models.CharField("Толщина слоя", max_length=125, blank=True)
    humidity_and_temperature = models.CharField("Влажность и температура", max_length=255, blank=True)
    noise_level = models.CharField("Уровень шума", max_length=125, blank=True)
    integration = models.CharField("Интеграция", max_length=255, blank=True)
    compressed_air = models.CharField("Подключение к сжатому воздуху", max_length=255, blank=True)
    weight = models.CharField("Масса, кг", max_length=125, blank=True)
    control = models.CharField("Управление", max_length=255, blank=True)
    dimensions = models.CharField("Габариты (Д×Ш×В), мм", max_length=125, blank=True)
    power_consumption = models.CharField("Потребляемая мощность, кВт", max_length=125, blank=True)
    warranty = models.CharField("Гарантия, мес", max_length=125, blank=True)

    is_published = models.BooleanField(default=True, verbose_name="Опубликовано")
    sort_order = models.PositiveSmallIntegerField(default=0, verbose_name="Порядок")

    class Meta:
        ordering = ['sort_order', '-created_at']
        verbose_name = "Сушильный шкаф"
        verbose_name_plural = "Сушильные шкафы"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("equipment:dryer-detail", kwargs={"slug": self.slug})


class ProductImage(TimeStampedModel):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name="Продукт"
    )
    image = models.ImageField(upload_to='equipment/gallery/', verbose_name="Файл")
    alt = models.CharField(max_length=128, blank=True, verbose_name="ALT-текст")
    sort_order = models.PositiveSmallIntegerField(default=0, verbose_name="Порядок")

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Фото"
        verbose_name_plural = "Галерея"
