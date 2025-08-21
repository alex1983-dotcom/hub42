from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)   # вложенный объект

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'tagline', 'description', 'image',
            'max_temperature', 'build_volume', 'price',
            'is_published', 'created_at', 'updated_at',
            'category'
        )