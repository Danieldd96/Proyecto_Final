from django.urls import path, include

from comentarios.views import ComentariosView, RespuestasView


urlpatterns = [
    path('agregar/comentario/', ComentariosView.as_view()),
    path('agregar/respuesta/', RespuestasView.as_view()),
]   