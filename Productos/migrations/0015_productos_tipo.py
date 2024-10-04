# Generated by Django 5.1.1 on 2024-10-04 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Productos', '0014_productos_categoria'),
    ]

    operations = [
        migrations.AddField(
            model_name='productos',
            name='tipo',
            field=models.CharField(choices=[('Bicicletas', 'Bicicletas'), ('Ropa', 'Ropa'), ('Nutrición', 'Nutrición'), ('Accesorios', 'Accesorios'), ('Partes', 'Partes')], default='Bicicletas', max_length=255),
        ),
    ]
