from django.urls import path, include
from rest_framework import routers
from .views import UsuarioViewSet, DatosUsuarioViewSet

usuario_router = routers.DefaultRouter()
usuario_router.register(r'usuarios', UsuarioViewSet)

datos_usuario_router = routers.DefaultRouter()
datos_usuario_router.register(r'datosusuario', DatosUsuarioViewSet)

urlpatterns = [
    path('user/', include(usuario_router.urls)),
    path('data/', include(datos_usuario_router.urls)),
]
