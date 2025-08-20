from django.contrib import admin
from .models import ContactFooter

@admin.register(ContactFooter)
class ContactFooterAdmin(admin.ModelAdmin):
    list_display = ('office_address', 'office_phone', 'service_phone')
    # пока одна запись, но можно добавить ещё