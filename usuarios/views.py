# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate
# from rest_framework.authtoken.models import Token
# from rest_framework import status

# # Create your views here.
# class RegistroView(APIView):
#     def post(self,request):
#         mail_user= request.data.get('mail_user')
#         contrasena = request.data.get('contrasena')
        
#         if User.objects.filter(username=mail_user).exists():
#             return Response({'Error':'Usuario ya existe'},status=status.HTTP_400_BAD_REQUEST)
        
#         nuevo_usuario=User.objects.create_user(username=mail_user,password=contrasena)
#         return Response({'success':"Usuario creado"},status=status.HTTP_201_CREATED)
    
    
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