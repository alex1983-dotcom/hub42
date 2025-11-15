from django.contrib import admin
from .models import SocialLink


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    change_form_template = 'admin/social/change_form.html'
    list_display = ("name", "url", "is_active", "is_system")
    list_editable = ("is_active",)

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_system:
            return False
        return super().has_delete_permission(request, obj)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions

