from rest_framework import serializers
from .models import ContactRequest, LeadSource


class LeadSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSource
        fields = ('id', 'name')


class ContactRequestSerializer(serializers.ModelSerializer):
    lead_source_name = serializers.CharField(source='lead_source.name', read_only=True)

    class Meta:
        model = ContactRequest
        fields = [
            'id', 'name', 'email', 'phone', 'company', 'message',
            'lead_source', 'lead_source_name', 'created_at'
        ]

    # def validate_lead_source(self, value):
    #     if value in (0, "0", ""):
    #         other, _ = LeadSource.objects.get_or_create(name='Другое')
    #         return other
    #     if value and not LeadSource.objects.filter(pk=value).exists():
    #         raise serializers.ValidationError("Указан несуществующий источник.")
    #     return value