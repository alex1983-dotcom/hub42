from django.contrib import admin
from .models import ContactFooter, PageBlock, BlockItem, ApplicationArticle, ServiceRoadmapItem, ServiceOfferItem, Service


class BlockItemInline(admin.TabularInline):
    model = BlockItem
    extra = 1


class ServiceRoadmapItemInline(admin.TabularInline):
    model = ServiceRoadmapItem
    extra = 1




class ServiceOfferItemInline(admin.TabularInline):
    model = ServiceOfferItem
    extra = 1

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("service_type", "title", "sort_order")
    inlines = [ServiceRoadmapItemInline, ServiceOfferItemInline]


@admin.register(PageBlock)
class PageBlockAdmin(admin.ModelAdmin):
    list_display = ("block_type", "title", "subtitle", "content", "sort_order", "is_active")
    list_editable = ("sort_order", "is_active")
    inlines = [BlockItemInline]


@admin.register(BlockItem)
class BlockItemAdmin(admin.ModelAdmin):
    list_display = ("title", "parent_block", "sort_order")
    list_filter = ("parent_block",)


@admin.register(ApplicationArticle)
class ApplicationArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "related_item", "is_published", "published_at")
    list_filter = ("is_published", "published_at")
    search_fields = ("title", "preview", "body")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("published_at",)


@admin.register(ContactFooter)
class ContactFooterAdmin(admin.ModelAdmin):
    list_display = ('office_address', 'office_phone', 'service_phone')
