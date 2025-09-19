# apps/equipment/models.py
from django.db import models
from django.urls import reverse
from apps.core.models import TimeStampedModel
from apps.pages.models import IconicMixin  # ← миксин


class Category(TimeStampedModel):
    name = models.CharField(max_length=64, verbose_name="Название")
    slug = models.SlugField(unique=True, verbose_name="URL")

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Product(IconicMixin, TimeStampedModel):
    """
    ЕДИНАЯ модель вместо старого Product и Dryer.
    Различаем тип через product_type.
    """
    PRODUCT_TYPES = (
        ("printer", "3D-принтер"),
        ("dryer",   "Сушильный шкаф"),
    )

    # базовые поля
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',   # ← как раньше
        verbose_name="Категория"
    )
    name = models.CharField(max_length=128, verbose_name="Название")
    slug = models.SlugField(unique=True, verbose_name="URL")
    tagline = models.CharField(max_length=256, blank=True, verbose_name="Слоган")
    description = models.TextField(verbose_name="Описание")
    image = models.ImageField(
        upload_to="equipment/", verbose_name="Изображение-обложка"
    )
    is_published = models.BooleanField(default=True, verbose_name="Опубликовано")
    price = models.PositiveIntegerField("Цена, р.", default=0)

    # --- технические характеристики (все старые имена сохранены) ------
    volume_construction = models.CharField(
        "Объём построения", max_length=125, blank=True
    )
    extruders_count = models.CharField(
        "Кол-во экструдеров", max_length=125, blank=True
    )
    bed_max_temp = models.PositiveIntegerField(
        "Температура стола, °C", blank=True, null=True
    )
    layer_thickness = models.CharField(
        "Толщина слоя, мм", max_length=125, blank=True
    )
    filament_diameter = models.CharField(
        "Диаметр сопел, мм", max_length=125, blank=True
    )
    print_speed = models.CharField(
        "Скорость печати", max_length=125, blank=True
    )
    positioning_accuracy = models.CharField(
        "Позиционирование (XY/Z)", max_length=64, blank=True
    )
    surface_of_site = models.CharField(
        "Поверхность площадки", max_length=350, blank=True
    )
    control = models.CharField("Управление", max_length=128, blank=True)
    software = models.CharField(
        "Операционная система", max_length=256, blank=True
    )
    dimensions = models.CharField(
        "Габариты (Д×Ш×В), мм", max_length=64, blank=True
    )
    weight = models.CharField("Масса, кг", max_length=125, blank=True)
    energy_consumption = models.CharField(
        "Энергопотребление", max_length=125, blank=True
    )
    materials = models.TextField("Материалы", blank=True)
    guarantee = models.CharField("Гарантия", max_length=128, blank=True)
    power_supply = models.CharField("Питание", max_length=125, blank=True)
    additionally = models.TextField("Дополнительно", blank=True)

    # специфичные для сушилок

    purpose = models.CharField(
        "Назначение", max_length=255, blank=True
    )

    heating_type = models.CharField(
        "Нагрев камеры", max_length=255, blank=True
    )

    capacity_spools = models.PositiveSmallIntegerField(
        "Вместимость катушек, шт", default=12, blank=True, null=True
    )
    humidity_and_temperature = models.CharField(
        "Влажность и температура", max_length=255, blank=True
    )
    power_consumption = models.CharField(
        "Потребляемая мощность, кВт", max_length=125, blank=True
    )
    noise_level = models.CharField(
        "Уровень шума", max_length=125, blank=True
    )
    integration = models.CharField(
        "Интеграция", max_length=255, blank=True
    )
    compressed_air = models.CharField(
        "Подключение к сжатому воздуху", max_length=255, blank=True
    )

    # служебные
    product_type = models.CharField(
        max_length=10,
        choices=PRODUCT_TYPES,
        verbose_name="Тип продукта"
    )
    sort_order = models.PositiveSmallIntegerField(
        "Порядок", default=0, blank=True
    )

    class Meta:
        ordering = ["sort_order", "-created_at"]
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"

    def __str__(self):
        return f"{self.name} ({self.get_product_type_display()})"

    def get_absolute_url(self):
        return reverse(
            "equipment:product-detail",
            kwargs={"slug": self.slug, "ptype": self.product_type},
        )


class ProductImage(TimeStampedModel):
    """
    Галерея изображений к продукту.
    related_name = 'images' – не меняем, фронт ждёт именно images.
    """
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images',   # ← как было
        verbose_name="Продукт"
    )
    image = models.ImageField(
        upload_to='equipment/gallery/', verbose_name="Файл"
    )
    alt = models.CharField(
        max_length=128, blank=True, verbose_name="ALT-текст"
    )
    sort_order = models.PositiveSmallIntegerField(
        "Порядок", default=0
    )

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Фото"
        verbose_name_plural = "Галерея"

