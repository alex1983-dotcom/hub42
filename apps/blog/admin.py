from django.contrib import admin
from .models import Category, Post


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "status", "published_at", "created_at")
    list_filter = ("status", "category", "created_at")
    search_fields = ("title", "preview")
    prepopulated_fields = {"slug": ("title",)}
    raw_id_fields = ("category",)
