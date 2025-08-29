from django.contrib import admin
from .models import ContactFooter, Icon, PageBlock, BlockItem, ApplicationArticle, ServiceRoadmapItem, ServiceOfferItem, Service


class BlockItemInline(admin.TabularInline):
    model = BlockItem
    extra = 1
    # Чтобы выпадающий список иконок был компактным
    autocomplete_fields = ('icon',)


class ServiceRoadmapItemInline(admin.TabularInline):
    model = ServiceRoadmapItem
    extra = 1


class ServiceOfferItemInline(admin.TabularInline):
    model = ServiceOfferItem
    extra = 1


# ---------- Иконки ----------
@admin.register(Icon)
class IconAdmin(admin.ModelAdmin):
    list_display = ('name', 'file_name', 'css_class', 'is_active')
    list_filter  = ('is_active',)
    search_fields = ('name', 'file_name', 'css_class')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("service_type", "title", "sort_order")
    inlines = [ServiceRoadmapItemInline, ServiceOfferItemInline]


# ---------- Блок ----------
@admin.register(PageBlock)
class PageBlockAdmin(admin.ModelAdmin):
    list_display = ('block_type', 'title', 'is_active', 'sort_order')
    list_editable = ('is_active', 'sort_order')
    inlines = [BlockItemInline]


# ---------- Элементы ----------
@admin.register(BlockItem)
class BlockItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'parent_block', 'icon', 'sort_order')
    list_filter  = ('parent_block', 'icon')
    search_fields = ('title',)
    autocomplete_fields = ('icon',)


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


