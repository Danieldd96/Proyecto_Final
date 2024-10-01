from django.db import models
from tiendas.models import Tienda
from usuarios.models import Usuario
# Create your models here.
class Categoria(models.Model):
    producto=models.ForeignKey('Productos', on_delete=models.CASCADE, related_name='categorias')
    tipo=models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self):
        return self.tipo

class Productos(models.Model):
    nombre = models.CharField(max_length=255)
    precio = models.IntegerField()
    descripcion = models.CharField(max_length=255)
    fecha = models.DateField()
    ubicacion_producto = models.CharField(max_length=255, default="Hub Comunal")
    cantidad = models.IntegerField()
    imagen = models.ImageField()

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return self.nombre


class Resenas(models.Model):
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    producto = models.ForeignKey(Productos, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE) 
    puntuacion = models.SmallIntegerField()
    comentario = models.CharField(max_length=255)
    fecha_publicacion = models.DateField()

    class Meta:
        verbose_name = 'Reseña'
        verbose_name_plural = 'Reseñas'

    def __str__(self):
        return self.comentario
