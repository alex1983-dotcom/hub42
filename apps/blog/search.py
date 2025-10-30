from django.db.models import Q, Case, When, Func, Value, IntegerField
from rest_framework import filters
import re


def _trigrams(text: str) -> set[str]:
    text = re.sub(r"\s+", "", text.lower())
    return {text[i : i + 3] for i in range(len(text) - 2)}


class MultiWordSearchFilter(filters.SearchFilter):
    search_param = "search"

    def filter_queryset(self, request, queryset, view):
        raw = request.query_params.get(self.search_param, "").strip()
        if not raw:
            return queryset

        # 1. режем на слова
        words = [w.lower() for w in re.findall(r"\w+", raw)]
        if not words:
            return queryset

        # 2. быстрый фильтр: хоть одно слово встречается
        q = Q()
        for w in words:
            q |= Q(title__icontains=w) | Q(preview__icontains=w) | Q(body__icontains=w)
        candidates = queryset.filter(q).distinct()

        # 3. ранжируем: чем больше слов совпало, тем выше
        ranked = []
        for post in candidates.only("id", "title", "preview", "body").iterator():
            score = 0
            for w in words:
                score += (
                    (w in post.title.lower()) * 3 +
                    (w in post.preview.lower()) * 1 +
                    (w in post.body.lower()) * 1
                )
            if score:
                ranked.append((post.id, score))

        if not ranked:
            return candidates.none()

        ranked.sort(key=lambda x: x[1], reverse=True)
        ids = [pk for pk, _ in ranked]
        preserved = Case(*[When(id=pk, then=pos) for pos, pk in enumerate(ids)])
        return candidates.filter(id__in=ids).order_by(preserved)
