from django.contrib import admin
from .models import  Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "published_at", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("title", "preview")
    prepopulated_fields = {"slug": ("title",)}

