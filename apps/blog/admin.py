from django.contrib import admin
from django.utils import timezone
from .models import Post


@admin.action(description="Опубликовать выбранные посты")
def make_published(modeladmin, request, queryset):
    queryset.update(status="published", published_at=timezone.now())


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "published_at", "created_at")
    list_filter = ("status", "published_at")
    search_fields = ("title", "body")
    prepopulated_fields = {"slug": ("title",)}
    actions = [make_published]
    readonly_fields = ("created_at", "updated_at")