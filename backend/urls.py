from django.contrib import admin
from django.urls import path,include

from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', include_docs_urls(title="Api Documentation")),
    
    path('api/v1/',include('api.urls')),
    path('api/v2/',include('users.urls')),
    path('api/v3/',include('Productos.urls')),
    path('api/v4/',include('tiendas.urls')),
]
