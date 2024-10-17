from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Usuario, DatosUsuario
from .serializer import UsuarioSerializer, DatosUsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    # permission_classes = [IsAuthenticated]

class DatosUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DatosUsuario.objects.all()
    serializer_class = DatosUsuarioSerializer
    # permission_classes = [IsAuthenticated]
