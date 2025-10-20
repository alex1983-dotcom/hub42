from rest_framework import serializers
from .models import Category, Product, ProductImage
from apps.pages.models import Icon
from drf_spectacular.utils import extend_schema_field


class EquipmentIconSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Icon
        fields = ('id', 'name', 'file_name', 'css_class', 'url')

    @extend_schema_field(serializers.URLField())
    def get_url(self, obj):
        request = self.context.get('request')
        if obj.file_name:
            return request.build_absolute_uri(
                '/static/icons/' + obj.file_name
            ) if request else '/static/icons/' + obj.file_name
        return None


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('image', 'alt')


class EquipmentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class ProductSerializer(serializers.ModelSerializer):
    category = EquipmentCategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    icon = EquipmentIconSerializer(read_only=True)

    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'slug',
            'tagline',
            'description',
            'image',
            'is_published',
            'price',
            'product_type',
            'category',
            'images',
            'icon',
            # --- все технические поля
            'volume_construction',
            'extruders_count',
            'bed_max_temp',
            'layer_thickness',
            'filament_diameter',
            'print_speed',
            'positioning_accuracy',
            'surface_of_site',
            'control',
            'software',
            'dimensions',
            'weight',
            'energy_consumption',
            'materials',
            'guarantee',
            'power_supply',
            'additionally',
            'purpose',
            'heating_type',
            'capacity_spools',
            'humidity_and_temperature',
            'power_consumption',
            'noise_level',
            'integration',
            'compressed_air',
            'sort_order',
            'created_at',
            'updated_at',
        )

