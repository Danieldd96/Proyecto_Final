# Generated by Django 5.1.1 on 2024-10-02 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Productos', '0011_productos_categoria'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productos',
            name='categoria',
            field=models.ManyToManyField(blank=True, null=True, to='Productos.categoria'),
        ),
    ]
