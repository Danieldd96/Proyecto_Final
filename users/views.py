from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.db import IntegrityError

from users.models import Usuario

class RegistroView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        telefono = request.data.get('telefono')
        direccion = request.data.get('direccion')
        edad = request.data.get('edad')
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'El usuario ya existe'}, status=400)
        else:
            try:
                crear_usuario = User.objects.create_user(username=username, password=password, email=email)
                
                Usuario.objects.create(
                    user=crear_usuario, 
                    telefono=telefono,
                    direccion=direccion,
                    edad=edad
                )
                
                return Response({'success': 'Usuario creado exitosamente'}, status=201)
            except IntegrityError:
                return Response({'error': 'Error al crear el usuario'}, status=400)
