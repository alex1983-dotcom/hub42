from django.db import models


class SocialLink(models.Model):
    name = models.CharField(max_length=20, unique=True)
    url = models.URLField()
    is_active = models.BooleanField(default=True)
    is_system = models.BooleanField("Системная ссылка", default=False, editable=False)

    def __str__(self):
        return self.name

