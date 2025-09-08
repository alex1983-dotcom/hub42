from rest_framework import serializers
from .models import Category, Product, Dryer, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('image', 'alt')


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'slug', 'tagline', 'description', 'image', 'is_published',
            'volume_construction', 'extruders_count', 'bed_max_temp',
            'layer_thickness', 'filament_diameter', 'print_speed',
            'positioning_accuracy', 'surface_of_site', 'control',
            'software', 'dimensions', 'weight', 'energy_consumption',
            'materials', 'guarantee', 'power_supply', 'additionally',
            'price', 'created_at', 'updated_at', 'category', 'images'
        )


class DryerSerializer(serializers.ModelSerializer):
    compatible_printers = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Dryer
        fields = (
            'id', 'name', 'slug', 'short_desc', 'description', 'image',
            'capacity_spools', 'purpose', 'heating_type', 'layer_thickness',
            'humidity_and_temperature', 'noise_level', 'integration',
            'compressed_air', 'weight', 'control', 'dimensions',
            'power_consumption', 'warranty', 'compatible_printers',
            'is_published', 'sort_order'
        )

