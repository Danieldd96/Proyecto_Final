from django.shortcuts import render
from rest_framework import viewsets
from .serializer import CategoriaSerializer,ProductosSerializer,ResenasSerializer
from .models import Categoria,Productos,Resenas
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status


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
    

class BusquedaProductoView(ListAPIView):
    serializer_class = ProductosSerializer

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('q', '')
        if not query:
            return Response({"error": "Se necesita una consulta de búsqueda"}, status=status.HTTP_400_BAD_REQUEST)
        
        productos_filtrados = Productos.objects.filter(
            nombre=query) | Productos.objects.filter(categoria=query)

        # Agrupar los productos por categoría
        categorias_agrupadas = {}
        for producto in productos_filtrados:
            if producto.categoria not in categorias_agrupadas:
                categorias_agrupadas[producto.categoria] = []
            categorias_agrupadas[producto.categoria].append(self.get_serializer(producto).data)
        
        return Response(categorias_agrupadas)
