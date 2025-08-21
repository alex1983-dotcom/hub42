from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'service_type', 'created_at')
    list_filter  = ('service_type', 'created_at')
    search_fields = ('title', 'description')