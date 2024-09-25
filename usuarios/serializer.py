from rest_framework import serializers
from .models import Usuario,DatosUsuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class DatosUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosUsuario
        fields = '__all__'