# Generated by Django 5.1.1 on 2024-10-02 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Productos', '0006_alter_categoria_producto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productos',
            name='categoria',
            field=models.CharField(blank=True, default='Bicicletas', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='productos',
            name='imagen',
            field=models.TextField(),
        ),
    ]
