import re
from django.db import models
from django.db.models.query import Q
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.urls import reverse
from mdeditor.fields import MDTextField
from apps.core.models import TimeStampedModel


class PostManager(models.Manager):
    def published(self):
        return self.filter(status="published", published_at__lte=timezone.now())


class Post(TimeStampedModel):
    STATUS_CHOICES = (("draft", "Черновик"), ("published", "Опубликовано"))

    title = models.CharField("Заголовок", max_length=255, db_index=True)
    image = models.ImageField(upload_to="post/", verbose_name="Изображение-обложка статьи")
    slug = models.SlugField("URL", unique=True, max_length=255)
    preview = models.TextField("Анонс", max_length=500)
    body = MDTextField("Текст")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="draft")
    published_at = models.DateTimeField("Дата публикации", blank=True, null=True)
    meta_description = models.CharField(
        "SEO-описание", max_length=160, blank=True
    )

    objects = PostManager()

    class Meta:
        ordering = ["-published_at"]
        indexes = [
            models.Index(fields=["-published_at"]),
            models.Index(fields=["slug"]),
        ]
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"

    def __str__(self):
        return self.title

    def clean(self):
        if self.published_at and self.published_at > timezone.now():
            raise ValidationError("Дата публикации не может быть в будущем.")

    def save(self, *args, **kwargs):
        if self.status == "published" and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("blog:detail", kwargs={"slug": self.slug})

    def get_similar_posts(self, limit=3):
        """
        Находит похожие статьи по пересечению слов в заголовке и анонсе.
        Возвращает список из `limit` статей, отсортированных по релевантности.
        """
        # Собираем "значимые" слова из текущей статьи
        current_text = f"{self.title} {self.preview}".lower()
        words = set(re.findall(r"\w{3,}", current_text))  # только слова ≥3 символов

        # Стоп-слова, которые не несут смысла
        stop_words = {"про", "для", "что", "как", "при", "это", "наш", "вас"}
        keywords = words - stop_words

        if not keywords:
            # Если ключевых слов нет — возвращаем последние статьи
            return Post.objects.published().exclude(id=self.id)[:limit]

        # Ищем статьи, где встречаются эти слова
        query = Q()
        for word in keywords:
            query |= Q(title__icontains=word) | Q(preview__icontains=word)

        candidates = Post.objects.published().exclude(id=self.id).filter(query)

        # Считаем баллы за каждую статью
        scored = []
        for post in candidates:
            score = 0
            post_text = f"{post.title} {post.preview}".lower()
            for word in keywords:
                if word in post_text:
                    score += 1
            scored.append((post, score))

        # Сортируем по баллам (по убыванию) и дате публикации
        scored.sort(
            key=lambda x: (x[1], x[0].published_at or x[0].created_at), reverse=True
        )

        # Возвращаем только объекты, без счетчика
        return [post for post, score in scored[:limit]]

