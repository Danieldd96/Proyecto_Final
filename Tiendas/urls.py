from django.urls import path, include
from rest_framework import routers
from .views import TiendaViewSet,TallerViewSet,UbicacionViewSet

tienda_router = routers.DefaultRouter()
tienda_router.register(r'tiendas', TiendaViewSet)

taller_router = routers.DefaultRouter()
taller_router.register(r'talleres', TallerViewSet)

ubicacion_router = routers.DefaultRouter()
ubicacion_router.register(r'ubicaciones', UbicacionViewSet)

urlpatterns = [
    path('tienda/', include(tienda_router.urls)),
    path('taller/', include(taller_router.urls)),
    path('ubicacion/', include(ubicacion_router.urls)),
] 