from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from comentarios.models import Comentario, Respuestas
from comentarios.serializer import ComentarioSerializer, RespuestaSerializer

class ComentariosView(ListCreateAPIView):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    
class RespuestasView(ListCreateAPIView):
    queryset = Respuestas.objects.all()
    serializer_class = RespuestaSerializer