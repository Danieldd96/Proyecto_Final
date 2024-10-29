from comentarios.models import Comentario, Respuestas
from rest_framework import serializers

class ComentarioSerializer(serializers.ModelSerializer):
    usuario_email = serializers.EmailField(source='usuario_comentario.email', read_only=True)
    
    class Meta:
        model = Comentario
        fields = "__all__"
        extra_fields=['usuario_email']
        
class RespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuestas
        fields = "__all__"
        