from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product #Model the i want serialize
        fields = '__all__'  # The fields that i want to actually render out. ['name', 'price', ...]

