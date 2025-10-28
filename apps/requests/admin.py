from django.contrib import admin
from .models import LeadSource, ContactRequest, Reviews


@admin.register(LeadSource)
class LeadSourceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'email',
        'phone',
        'company',
        'lead_source',
        'created_at',
        'is_processed',
    )
    list_filter = (
        'is_processed',
        'lead_source',
        ('created_at', admin.DateFieldListFilter),  # фильтр по дате
    )
    search_fields = (
        'name',
        'email',
        'phone',
        'company',
        'message',
    )
    list_editable = ('is_processed',)
    list_display_links = ('id', 'name')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)

    actions = ['mark_processed']

    @admin.action(description='Пометить выбранные заявки как обработанные')
    def mark_processed(self, request, queryset):
        updated = queryset.update(is_processed=True)
        self.message_user(request, f'Обновлено заявок: {updated}')


@admin.register(Reviews)
class ReviewsAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'created_at', 'is_published')
    list_filter = ('is_published', 'created_at')
    search_fields = ('name', 'company', 'review')
    list_editable = ('is_published',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at')