from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password


# Create your models here.
class DatosUsuario(models.Model):
    nombre = models.CharField(max_length=255, blank=True, null=True)
    apellidos = models.CharField(max_length=255, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)

    class Meta:
        verbose_name = 'Datos de Usuario'
        verbose_name_plural = 'Datos de Usuarios'

    def __str__(self):
        return f'{self.nombre} {self.apellidos}'

class Usuario(models.Model):
    mail_user = models.EmailField(max_length=255, unique=True)
    contrasena = models.CharField(max_length=128) 
    datos = models.OneToOneField(DatosUsuario, on_delete=models.CASCADE, related_name='usuario')
    fecha_de_creacion = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)  # Para activar/desactivar usuario

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.mail_user

    def set_password(self, raw_password):
        self.contrasena = make_password(raw_password)  # Almacena la contraseña encriptada

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.contrasena) 