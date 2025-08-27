from rest_framework import serializers
from .models import ContactFooter, PageBlock, BlockItem, ApplicationArticle


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


class ContactFooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactFooter
        fields = '__all__'