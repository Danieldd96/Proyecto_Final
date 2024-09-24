from django.db import models

# Create your models here.
class Servicio(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=300)
    fecha_programada = models.DateField()

    class Meta:
        verbose_name = 'Servicio'
        verbose_name_plural = 'Servicios'

    def __str__(self):
        return self.nombre