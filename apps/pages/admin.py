from django.contrib import admin
from .models import ContactFooter, PageBlock, BlockItem


class BlockItemInline(admin.TabularInline):
    model = BlockItem
    extra = 1


@admin.register(PageBlock)
class PageBlockAdmin(admin.ModelAdmin):
    list_display = ("block_type", "title", "sort_order", "is_active")
    list_editable = ("sort_order", "is_active")
    inlines = [BlockItemInline]


@admin.register(BlockItem)
class BlockItemAdmin(admin.ModelAdmin):
    list_display = ("title", "parent_block", "sort_order")
    list_filter = ("parent_block",)


@admin.register(ContactFooter)
class ContactFooterAdmin(admin.ModelAdmin):
    list_display = ('office_address', 'office_phone', 'service_phone')
