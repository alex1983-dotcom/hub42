from django.views.generic import ListView, DetailView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .models import Post


@method_decorator(cache_page(60 * 15), name="dispatch")  # 15 минут
class PostListView(ListView):
    model = Post
    template_name = "blog/post_list.html"
    context_object_name = "posts"
    paginate_by = 12

    def get_queryset(self):
        return Post.objects.published()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["meta_title"] = "Блог"
        context["meta_description"] = "Последние статьи и новости компании HUB42"
        return context


class PostDetailView(DetailView):
    model = Post
    template_name = "blog/post_detail.html"
    context_object_name = "post"
    slug_field = "slug"
    slug_url_kwarg = "slug"

    def get_queryset(self):
        return Post.objects.published()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["meta_title"] = self.object.title
        context["meta_description"] = self.object.meta_description or self.object.preview[:160]
        return context