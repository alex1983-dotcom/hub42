from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    # если нужно, можно добавить/переопределить любые поля
    class Meta:
        model = Post
        fields = (
            'id', 'title', 'slug', 'preview', 'body',
            'status', 'published_at', 'meta_description',
            'created_at', 'updated_at',
        )