from comentarios.models import Comentario, Respuestas
from rest_framework import serializers


class ComentarioSerializer(serializers.ModelSerializer):
    usuario_email = serializers.CharField(source='usuario_comentario.user.email', read_only=True)
    nombre_producto = serializers.CharField(source='producto_comentario.nombre', read_only=True)
    class Meta:
        model = Comentario
        fields = ['id', 'valoracion', 'texto_comentario', 'usuario_email', 'fecha_comentario', 'producto_comentario', 'usuario_comentario','nombre_producto']



class RespuestaSerializer(serializers.ModelSerializer):
    usuario_email = serializers.CharField(source='usuario_responde.user.email', read_only=True)

    class Meta:
        model = Respuestas
        fields = "__all__"
        extra_fields = ['usuario_email']
        