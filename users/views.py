from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.db import IntegrityError
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import Usuario

class RegistroView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        telefono = request.data.get('telefono')
        direccion = request.data.get('direccion')
        edad = request.data.get('edad')

        # Validar que los campos requeridos estén presentes
        if not all([username, password, email, telefono, direccion, edad]):
            return Response({'error': 'Faltan datos obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el correo electrónico ya está registrado
        if User.objects.filter(email=email).exists():
            return Response({'error': 'El correo ya está registrado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            nuevo_usuario = User.objects.create_user(username=username, password=password, email=email)
            Usuario.objects.create(user=nuevo_usuario, telefono=telefono, direccion=direccion, edad=edad)
            return Response({'success': 'Usuario creado exitosamente'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': 'Error al crear el usuario'}, status=status.HTTP_400_BAD_REQUEST)
            
class InicioSesionView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.get(email=email)
        if user and authenticate(request, username=user.username, password=password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'token_type': 'Bearer',
                'expires_in': str(refresh.access_token.payload['exp']),
                'id':user.id,
                'email':user.email
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)
