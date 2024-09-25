from django.db import models

# Create your models here.
class Factura_tienda(models.Model):
    producto=models.ForeignKey('producto',on_delete=models.CASCADE)
    user=models.ForeignKey('user',on_delete=models.CASCADE)
    tienda=models.ForeignKey("tienda",on_delete=models.CASCADE)
    total=models.DecimalField(max_digits=10,decimal_places=2)
    
    class Meta:
        verbose_name = 'Factura Tienda'
        verbose_name_plural = 'Facturas Tienda'

    def __str__(self):
        return f'Factura Tienda {self.id} - {self.user}'
    
class Factura_taller(models.Model):
    servicio=models.ForeignKey('servicio',on_delete=models.CASCADE)
    user=models.ForeignKey("user",on_delete=models.CASCADE)
    taller=models.ForeignKey('taller',on_delete=models.CASCADE)
    total=models.DecimalField(max_digits=10,decimal_places=2)
    
    class Meta:
        verbose_name = 'Factura Taller'
        verbose_name_plural = 'Facturas Taller'

    def __str__(self):
        return f'Factura Taller {self.id} - {self.user}'