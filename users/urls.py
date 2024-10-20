from django.urls import path,include

from users.views import RegistroView,InicioSesionView

urlpatterns = [
    path('registro/', RegistroView.as_view(),name='registro'),
    path('login/', InicioSesionView.as_view(), name='login'),
]