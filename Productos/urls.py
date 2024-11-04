from django.urls import path, include
from rest_framework import routers
from .views import ActualizarProducto, CategoriaViewSet, ProductosViewSet, ResenasViewSet, BusquedaProductoView

categoria_router = routers.DefaultRouter()
categoria_router.register(r'categorias', CategoriaViewSet)

productos_router = routers.DefaultRouter()
productos_router.register(r'productos', ProductosViewSet)

resenas_router = routers.DefaultRouter()
resenas_router.register(r'resenas', ResenasViewSet)

urlpatterns = [
    path('categoria/', include(categoria_router.urls)),
    path('producto/', include(productos_router.urls)),
    path('resenas/', include(resenas_router.urls)),
    path('busqueda/', BusquedaProductoView.as_view()),
    path('actualizar/<int:id>/', ActualizarProducto.as_view()),
    
]   