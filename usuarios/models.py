from django.db import models

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
    user = models.CharField(max_length=255,unique=True,blank=True,null=True)
    mail_user = models.EmailField(max_length=255, unique=True)
    contrasena = models.CharField(max_length=128) 
    datos = models.ForeignKey("DatosUsuario", on_delete=models.CASCADE,null=True,blank=True)
    fecha_de_creacion = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)  # Para activar/desactivar usuario

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.mail_user