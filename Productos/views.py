from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CategoriaSerializer,ProductosSerializer,ResenasSerializer
from .models import Categoria,Productos,Resenas
from rest_framework.generics import ListAPIView
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
    
class BusquedaCategoriaView(ListAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    lookup_field = 'categoria'
    def get_queryset(self): 
        producto_categoria = self.kwargs.get(self.lookup_field) 
        return Productos.objects.filter(categoria=producto_categoria)
