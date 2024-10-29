from django.db import models

class Comentario(models.Model):
    valoracion = models.IntegerField(default=0)
    texto_comentario = models.TextField()
    usuario_comentario = models.ForeignKey('users.Usuario',on_delete=models.CASCADE,related_name='comentarios_usuario')
    producto_comentario = models.ForeignKey('Productos.Productos',on_delete=models.CASCADE,related_name='comentarios_producto')
    fecha_comentario = models.DateField(auto_now=True)

    def __str__(self):
        return self.texto_comentario

class Respuestas(models.Model):
    respuesta_comentario = models.ForeignKey('comentarios.Comentario',on_delete=models.CASCADE,related_name='respuestas_comentario') # De lo que esta respondiendo
    usuario_respuesta_comentario = models.ForeignKey('users.Usuario',on_delete=models.CASCADE,related_name='respuestas_usuario') # El que hizo el comentario
    respuesta_texto = models.TextField() # La respuesta
    usuario_responde = models.ForeignKey('users.Usuario',on_delete=models.CASCADE,related_name='respuestas_de_usuario') # El que respond el comentario