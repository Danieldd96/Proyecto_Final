from comentarios.models import Comentario, Respuestas
from rest_framework import serializers

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = "__all__"
        
class RespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuestas
        fields = "__all__"
        