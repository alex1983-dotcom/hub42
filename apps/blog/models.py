from django.db import models
from django.utils import timezone
from mdeditor.fields import MDTextField
from apps.core.models import TimeStampedModel


class PostManager(models.Manager):
    def published(self):
        return self.filter(status="published", published_at__lte=timezone.now())


class Post(TimeStampedModel):
    STATUS_CHOICES = (("draft", "Черновик"), ("published", "Опубликовано"))

    title = models.CharField("Заголовок", max_length=255, db_index=True)
    slug = models.SlugField("URL", unique=True, max_length=255)
    preview = models.TextField("Анонс", max_length=500)
    body = MDTextField("Текст")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="draft")
    published_at = models.DateTimeField("Дата публикации", blank=True, null=True)
    meta_description = models.CharField(
        "SEO description", max_length=160, blank=True
    )

    objects = PostManager()

    class Meta:
        ordering = ["-published_at"]
        indexes = [
            models.Index(fields=["-published_at"]),
            models.Index(fields=["slug"]),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.status == "published" and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse("blog:detail", kwargs={"slug": self.slug})