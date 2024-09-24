from django.db import models

# Create your models here.
class Tienda(models.Model):
    nombre = models.CharField(max_length=255)
    telefonos = models.CharField(max_length=20)  # Usar CharField para teléfonos
    horarios = models.TimeField()  # Cambiar a TimeField para horarios

    class Meta:
        verbose_name = 'Tienda'
        verbose_name_plural = 'Tiendas'

    def __str__(self):
        return self.nombre

class Taller(models.Model):
    nombre = models.CharField(max_length=255)
    telefonos = models.CharField(max_length=20)  # Usar CharField para teléfonos
    horarios = models.TimeField()  # Cambiar a TimeField para horarios

    class Meta:
        verbose_name = 'Taller'
        verbose_name_plural = 'Talleres'

    def __str__(self):
        return self.nombre

class Ubicacion(models.Model):
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE, related_name='ubicaciones')
    ubicacion = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Ubicación'
        verbose_name_plural = 'Ubicaciones'

    def __str__(self):
        return f'Ubicación de {self.tienda.nombre}: {self.ubicacion}'