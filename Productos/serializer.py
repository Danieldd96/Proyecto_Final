from rest_framework import serializers
from .models import Categoria,Productos,Resenas

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'

class ResenasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resenas
        fields = '__all__'  