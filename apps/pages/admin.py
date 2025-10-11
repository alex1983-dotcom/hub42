# apps/pages/admin.py
from django.contrib import admin
from .models import (
    PageBlock, BlockItem, Icon, Service,
    ServiceRoadmapItem, ServiceOfferItem,
    ApplicationArticle, ContactFooter
)


class BlockItemInline(admin.TabularInline):
    model = BlockItem
    extra = 1
    autocomplete_fields = ('icon',)


class ServiceRoadmapItemInline(admin.TabularInline):
    model = ServiceRoadmapItem
    extra = 1


class ServiceOfferItemInline(admin.TabularInline):
    model = ServiceOfferItem
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("service_type", "title", "sort_order", "is_system")
    inlines = [ServiceRoadmapItemInline, ServiceOfferItemInline]

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_system:
            return False
        return super().has_delete_permission(request, obj)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions


@admin.register(PageBlock)
class PageBlockAdmin(admin.ModelAdmin):
    list_display = ("block_type", "title", "is_active", "sort_order", "is_system")
    list_editable = ("is_active", "sort_order")
    inlines = [BlockItemInline]

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_system:
            return False
        return super().has_delete_permission(request, obj)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions


@admin.register(BlockItem)
class BlockItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'parent_block', 'icon', 'sort_order', 'is_active', 'is_system')
    list_filter = ('parent_block', 'icon')
    search_fields = ('title',)
    autocomplete_fields = ('icon',)

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_system:
            return False
        return super().has_delete_permission(request, obj)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions


@admin.register(Icon)
class IconAdmin(admin.ModelAdmin):
    list_display = ('name', 'file_name', 'css_class', 'is_active', 'is_system')
    list_filter = ('is_active',)
    search_fields = ('name', 'file_name', 'css_class')

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_system:
            return False
        return super().has_delete_permission(request, obj)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions


@admin.register(ServiceRoadmapItem)
class ServiceRoadmapItemAdmin(admin.ModelAdmin):
    list_display = ('text', 'service', 'sort_order', 'is_system')
    list_filter = ('service',)
    search_fields = ('text',)

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_system:
            return False
        return super().has_delete_permission(request, obj)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions


@admin.register(ServiceOfferItem)
class ServiceOfferItemAdmin(admin.ModelAdmin):
    list_display = ('text', 'service', 'sort_order', 'is_system')
    list_filter = ('service',)
    search_fields = ('text',)

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_system:
            return False
        return super().has_delete_permission(request, obj)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions


@admin.register(ApplicationArticle)
class ApplicationArticleAdmin(admin.ModelAdmin):
    # убери 'is_system' из list_display
    list_display = ("title", "related_item", "is_published", "published_at")
    list_filter = ("is_published", "published_at")
    search_fields = ("title", "preview", "body")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("published_at",)

@admin.register(ContactFooter)
class ContactFooterAdmin(admin.ModelAdmin):
    list_display = ('office_address', 'office_phone', 'service_phone', 'is_system')

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_system:
            return False
        return super().has_delete_permission(request, obj)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions

