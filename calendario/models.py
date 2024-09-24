from django.db import models

# Create your models here.
class calendario(models.Model):
    id_user=models.ForeignKey('id_user',on_delete=models.CASCADE)
    fecha_evento=models.DateField()
    descripcion_evento=models.CharField(max_length=500)
    
    class Meta:
        verbose_name = 'Evento de Calendario'
        verbose_name_plural = 'Eventos de Calendario'

    def __str__(self):
        return f'Evento: {self.descripcion_evento} - Fecha: {self.fecha_evento}'
    
class recordatorios(models.Model):
    id_taller=models.ForeignKey("id_taller",on_delete=models.CASCADE)
    id_servicio=models.ForeignKey("id_servicio",on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Recordatorio'
        verbose_name_plural = 'Recordatorios'

    def __str__(self):
        return f'Recordatorio para {self.id_servicio} en {self.id_taller}'
    
class Historial_recordatorios(models.Model):
    id_user=models.ForeignKey('id_user',on_delete=models.CASCADE)
    fecha_servicio=models.DateField()
    fecha_entrada=models.DateField()
    
    class Meta:
        verbose_name = 'Historial de Recordatorios'
        verbose_name_plural = 'Historial de Recordatorios'

    def __str__(self):
        return f'Historial de {self.id_user} - Servicio: {self.fecha_servicio}'
    
class Agendar_mantenimiento(models.Model):
    id_taller=models.ForeignKey('id_taller',on_delete=models.CASCADE)
    id_servicio=models.ForeignKey('id_servicio',on_delete=models.CASCADE)
    fecha_programada=models.DateField()
    descripcion=models.CharField(max_length=300)
    
    class Meta:
        verbose_name = 'Agendar Mantenimiento'
        verbose_name_plural = 'Agendamientos de Mantenimiento'

    def __str__(self):
        return f'Agendamiento: {self.descripcion} - Fecha: {self.fecha_programada}'