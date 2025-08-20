from rest_framework import serializers
from .models import ContactFooter

class ContactFooterSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactFooter
        fields = '__all__'