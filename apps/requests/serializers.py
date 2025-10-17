from rest_framework import serializers
from .models import ContactRequest, LeadSource


class LeadSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSource
        fields = ('id', 'name')


class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = '__all__'

    def validate_lead_source(self, value):
        # если фронт прислал 0 или "0" – возвращаем объект «Другое»
        if value in (0, "0"):
            # ищем запись «Другое»; если нет – создаём
            other, _ = LeadSource.objects.get_or_create(
                defaults={'name': 'Другое'},
                name='Другое'          # уникальное поле
            )
            return other
        # Проверка существования id
        if value and not LeadSource.objects.filter(pk=value).exists():
            raise serializers.ValidationError("Указан несуществующий источник.")
        return value