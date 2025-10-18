from rest_framework import serializers
from .models import Category, Post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class PostSerializer(serializers.ModelSerializer):
    # вложенный объект (можно заменить на StringRelatedField, если нужно только имя)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Post
        fields = (
            "id",
            "title",
            "slug",
            "preview",
            "body",
            "status",
            "published_at",
            "meta_description",
            "created_at",
            "updated_at",
            "category",
        )