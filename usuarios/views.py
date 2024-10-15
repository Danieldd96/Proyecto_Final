from rest_framework import viewsets
from .serializer import UsuarioSerializer,DatosUsuarioSerializer
from .models import Usuario,DatosUsuario
# Create your views here.


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
class DatosUsuarioViewSet(viewsets.ModelViewSet):
    queryset = DatosUsuario.objects.all()
    serializer_class = DatosUsuarioSerializer