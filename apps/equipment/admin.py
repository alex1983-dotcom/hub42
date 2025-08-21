from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'max_temperature', 'is_published', 'created_at')
    list_filter  = ('category', 'is_published', 'created_at')
    search_fields = ('name', 'tagline', 'description')
    list_editable = ('price', 'is_published')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('name', 'tagline', 'description', 'image')
        }),
        ('Технические характеристики', {
            'fields': ('max_temperature', 'build_volume', 'price')
        }),
        ('Публикация', {
            'fields': ('category', 'is_published')
        }),
    )