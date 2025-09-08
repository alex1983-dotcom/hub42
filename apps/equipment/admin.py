from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, Dryer, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'alt', 'sort_order', 'image_preview')
    readonly_fields = ('image_preview',)
    ordering = ('sort_order',)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="120" style="object-fit:cover">', obj.image.url
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
        'name', 'category', 'price', 'volume_construction',
        'is_published', 'created_at'
    )
    list_filter = ('is_published', 'category', 'created_at')
    search_fields = ('name', 'tagline', 'description')
    list_editable = ('is_published',)
    ordering = ('-created_at',)
    prepopulated_fields = {'slug': ('name',)}

    fieldsets = (
        (None, {
            'fields': (
                'name', 'slug', 'tagline', 'description', 'image', 'category',
                'is_published'
            )
        }),
        ('Технические характеристики', {
            'fields': (
                'volume_construction', 'extruders_count', 'bed_max_temp',
                'layer_thickness', 'filament_diameter', 'print_speed',
                'positioning_accuracy', 'surface_of_site', 'control',
                'software', 'dimensions', 'weight', 'energy_consumption',
                'materials', 'guarantee', 'power_supply', 'additionally',
                'price'
            )
        }),
    )

    inlines = [ProductImageInline]


@admin.register(Dryer)
class DryerAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'capacity_spools', 'humidity_and_temperature',
        'power_consumption', 'is_published', 'sort_order'
    )
    list_filter = ('is_published', 'created_at')
    list_editable = ('is_published', 'sort_order')
    search_fields = ('name', 'short_desc', 'description')
    prepopulated_fields = {'slug': ('name',)}
