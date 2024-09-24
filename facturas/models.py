from django.db import models

# Create your models here.
class Factura_tienda(models.Model):
    id_producto=models.ForeignKey('id_producto',on_delete=models.CASCADE)
    id_user=models.ForeignKey('id_user',on_delete=models.CASCADE)
    id_tienda=models.ForeignKey("id_tienda",on_delete=models.CASCADE)
    total=models.IntegerField(max_digits=10,decimal_places=2)
    
    class Meta:
        verbose_name = 'Factura Tienda'
        verbose_name_plural = 'Facturas Tienda'

    def __str__(self):
        return f'Factura Tienda {self.id} - {self.id_user}'
    
class Factura_taller(models.Model):
    id_servicio=models.ForeignKey('id_servicio',on_delete=models.CASCADE)
    id_user=models.ForeignKey("id_user",on_delete=models.CASCADE)
    id_taller=models.ForeignKey('id_taller',on_delete=models.CASCADE)
    total=models.DecimalField(max_digits=10,decimal_places=2)
    
    class Meta:
        verbose_name = 'Factura Taller'
        verbose_name_plural = 'Facturas Taller'

    def __str__(self):
        return f'Factura Taller {self.id} - {self.id_user}'