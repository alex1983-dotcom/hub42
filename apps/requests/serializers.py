from rest_framework import serializers
from .models import ContactRequest, LeadSource, Reviews


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


class ReviewSerializer(serializers.ModelSerializer):
    """Для GET-запроса (опубликованные отзывы)."""
    class Meta:
        model = Reviews
        fields = (
            'id', 'name', 'email', 'company', 'review', 'created_at'
        )


class ReviewCreateSerializer(serializers.ModelSerializer):
    """Для POST-запроса (оставить отзыв)."""
    class Meta:
        model = Reviews
        fields = (
            'name', 'email', 'phone', 'company', 'review'
        )
        extra_kwargs = {
            'phone': {'required': False},
            'company': {'required': False},
            'review': {'required': True}
        }