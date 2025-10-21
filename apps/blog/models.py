from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from mdeditor.fields import MDTextField
from apps.core.models import TimeStampedModel


class Category(models.Model):
    name = models.CharField("Название", max_length=100, unique=True)
    slug = models.SlugField("URL", max_length=120, unique=True, db_index=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)


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
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="posts",
        verbose_name="Категория",
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

    def save(self, *args, **kwargs):
        if self.status == "published" and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse("blog:detail", kwargs={"slug": self.slug})
