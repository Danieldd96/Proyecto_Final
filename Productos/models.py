from django.db import models

# Create your models here.
class Categoria(models.Model):
    id_producto=models.ForeignKey('id_producto',on_delete=models.CASCADE)
    tipo=models.CharField(max_length=255)
    
    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self):
        return self.tipo
    
class Productos(models.Model):
    id_categoria=models.ForeignKey('id_categoria',on_delete=models.CASCADE)
    nombre=models.CharField(max_length=255)
    precio=models.IntegerField()
    cantidad=models.IntegerField()
    ubicacion_producto=models.CharField(max_length=255,default="Hub Comunal")
    imagen = models.ImageField()
    
    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return self.nombre
    
class Resenas(models.Model):
    id_tienda=models.ForeignKey('id_tienda',on_delete=models.CASCADE)
    id_user=models.ForeignKey('id_user',on_delete=models.CASCADE)
    puntuacion=models.SmallIntegerField()
    comentario=models.CharField(max_length=255)
    fecha_publicacion=models.DateField()
    
    class Meta:
        verbose_name = 'Reseña'
        verbose_name_plural = 'Reseñas'

    def __str__(self):
        return f'Reseña de {self.user} - Puntuación: {self.puntuacion}'
    