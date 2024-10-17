# usuarios/urls.py
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet

usuario_router = DefaultRouter()
usuario_router.register(r'usuarios', UsuarioViewSet, basename='usuarios')


urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', include(usuario_router.urls)), 
]
