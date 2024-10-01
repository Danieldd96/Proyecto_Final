from rest_framework import serializers
from .models import Tienda,Taller,Ubicacion

class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion    
        fields = '__all__'
        
        
class TiendaSerializer(serializers.ModelSerializer):
    ubicaciones = UbicacionSerializer(many=True)

    class Meta:
        model = Tienda
        fields = '__all__'

class TallerSerializer(serializers.ModelSerializer):
    ubicaciones = UbicacionSerializer(many=True)

    class Meta:
        model = Taller
        fields = '__all__'
