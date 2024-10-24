# Generated by Django 5.1.1 on 2024-10-17 20:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0004_alter_datosusuario_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='datosusuario',
            options={'verbose_name': 'Datos de Usuario', 'verbose_name_plural': 'Datos de Usuarios'},
        ),
        migrations.RemoveField(
            model_name='datosusuario',
            name='direccion',
        ),
        migrations.RemoveField(
            model_name='datosusuario',
            name='telefono',
        ),
        migrations.RemoveField(
            model_name='datosusuario',
            name='usuario',
        ),
        migrations.RemoveField(
            model_name='usuario',
            name='tipo_usuario',
        ),
        migrations.AddField(
            model_name='datosusuario',
            name='apellidos',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='datosusuario',
            name='fecha_nacimiento',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='datosusuario',
            name='nombre',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='usuario',
            name='datos',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='usuarios.datosusuario'),
        ),
    ]
