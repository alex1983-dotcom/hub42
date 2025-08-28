from rest_framework import serializers
from .models import ContactFooter, PageBlock, BlockItem, ApplicationArticle, ServiceRoadmapItem, ServiceOfferItem, Service


class BlockItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockItem
        fields = ("id", "title", "content", "icon", "sort_order")


class PageBlockSerializer(serializers.ModelSerializer):
    items = BlockItemSerializer(many=True, read_only=True)

    class Meta:
        model = PageBlock
        fields = ("id", "block_type", "title", "subtitle", "content", "is_active", "items")


class ApplicationArticleSerializer(serializers.ModelSerializer):
    related_item_title = serializers.CharField(source='related_item.title', read_only=True)

    class Meta:
        model = ApplicationArticle
        fields = (
            'id', 'title', 'slug', 'preview', 'body', 'image',
            'is_published', 'published_at', 'related_item_title'
        )


# apps/pages/serializers.py
class ServiceRoadmapItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRoadmapItem
        fields = ("id", "text", "sort_order")


class ServiceOfferItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceOfferItem
        fields = ("id", "text", "sort_order")


class ServiceSerializer(serializers.ModelSerializer):
    roadmap_items = ServiceRoadmapItemSerializer(many=True, read_only=True)
    offer_items = ServiceOfferItemSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = (
            "id", "service_type", "title", "sort_order",
            "roadmap_items", "offer_items"
        )


class ContactFooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactFooter
        fields = '__all__'