from django.db.models import Q, Case, When
from rest_framework import filters
import re


def _trigrams(text: str) -> set[str]:
    """3-буквенные кубики без регистра и пробелов."""
    text = re.sub(r"\s+", "", text.lower())
    return {text[i : i + 3] for i in range(len(text) - 2)}


class TrigramSearchFilter(filters.SearchFilter):
    search_param = "search"

    def filter_queryset(self, request, queryset, view):
        raw = request.query_params.get(self.search_param, "").strip()
        if not raw:
            return queryset

        # 1. быстрая предфильтрация (регистро-независимая)
        candidates = queryset.filter(
            Q(title__icontains=raw)
            | Q(preview__icontains=raw)
            | Q(body__icontains=raw)
        )

        # 2. ранжируем по совпадению кубиков
        query_cubes = _trigrams(raw)
        ranked = []
        for post in candidates.only("id", "title", "preview", "body").iterator():
            score = (
                len(query_cubes & _trigrams(post.title)) * 3
                + len(query_cubes & _trigrams(post.preview))
                + len(query_cubes & _trigrams(post.body))
            )
            if score:
                ranked.append((post.id, score))

        if not ranked:
            return candidates.none()

        ranked.sort(key=lambda x: x[1], reverse=True)
        ids = [pk for pk, _ in ranked]

        # 3. сохраняем порядок через Case
        preserved = Case(*[When(id=pk, then=pos) for pos, pk in enumerate(ids)])
        return candidates.filter(id__in=ids).order_by(preserved)
