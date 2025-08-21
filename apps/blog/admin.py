from django.contrib import admin
from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'published_at', 'created_at')
    list_filter  = ('status', 'created_at')
    search_fields = ('title', 'preview', 'body')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-published_at',)
    date_hierarchy = 'published_at'