from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from .models import Post


class SimilarPostSerializer(serializers.ModelSerializer):
    """
    Сериализатор для списка похожих статей.
    Отдаем только нужные поля, без большого body
    """
    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'slug',
            'preview',
            'image',
            'published_at',
            'created_at'
        )


class PostSerializer(serializers.ModelSerializer):
    similar_posts = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            "image",
            "title",
            "slug",
            "preview",
            "body",
            "status",
            "published_at",
            "meta_description",
            "created_at",
            "updated_at",
            "similar_posts",
        )

    @extend_schema_field(SimilarPostSerializer(many=True))
    def get_similar_posts(self, obj):
        """
        Возвращает список похожих статей.
        obj — это текущая статья.
        """
        similar = obj.get_similar_posts(limit=5)
        return SimilarPostSerializer(
            similar,
            many=True,
            context=self.context
        ).data
