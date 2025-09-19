from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'alt', 'sort_order', 'image_preview')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="120" style="object-fit:cover">',
                obj.image.url,
            )
        return '—'
    image_preview.short_description = 'Превью'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
        'product_type',
        'price',
        'is_published',
        'created_at',
    )
    list_filter = ('is_published', 'product_type', 'category', 'created_at')
    search_fields = ('name', 'tagline', 'description')
    list_editable = ('is_published',)
    ordering = ('-created_at',)
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]

    fieldsets = (
        (None, {
            'fields': (
                'name',
                'slug',
                'tagline',
                'description',
                'image',
                'category',
                'product_type',
                'is_published',
                'price',
                'icon',  # ← иконка из pages
            )
        }),
        ('Технические характеристики', {
            'fields': (
                'volume_construction',
                'extruders_count',
                'bed_max_temp',
                'layer_thickness',
                'filament_diameter',
                'print_speed',
                'positioning_accuracy',
                'surface_of_site',
                'control',
                'software',
                'dimensions',
                'weight',
                'energy_consumption',
                'materials',
                'guarantee',
                'power_supply',
                'additionally',
            )
        }),
        ('Параметры сушилки', {
            'fields': (
                'purpose',
                'heating_type',
                'capacity_spools',
                'humidity_and_temperature',
                'power_consumption',
                'noise_level',
                'integration',
                'compressed_air',
            )
        }),
        ('Служебные поля', {
            'fields': ('sort_order',),
        }),
    )

