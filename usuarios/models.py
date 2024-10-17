from django.db import models

# usuarios/models.py

class Usuario(models.Model):
    CASUAL = 'casual'
    ADMIN = 'admin'
    USER_TYPE_CHOICES = [
        (CASUAL, 'Casual'),
        (ADMIN, 'Admin'),
    ]

    user = models.CharField(max_length=255, unique=True, blank=True, null=True)
    mail_user = models.EmailField(max_length=255, unique=True)
    contrasena = models.CharField(max_length=128)
    tipo_usuario = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default=CASUAL)
    fecha_de_creacion = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.mail_user
    
class DatosUsuario(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='datos', null=True)
    direccion = models.CharField(max_length=255, default='Sin dirección') 
    telefono = models.CharField(max_length=20, default='Sin telefono')
    def __str__(self):
        return f"Datos de {self.usuario.nombre}"

