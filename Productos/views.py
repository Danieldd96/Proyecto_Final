from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CategoriaSerializer,ProductosSerializer,ResenasSerializer
from .models import Categoria,Productos,Resenas

# Create your views here.

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductosViewSet(viewsets.ModelViewSet):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer

class ResenasViewSet(viewsets.ModelViewSet):
    queryset = Resenas.objects.all()
    serializer_class = ResenasSerializer
