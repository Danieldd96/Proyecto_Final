from django.urls import path,include

from users.views import RegistroView

urlpatterns = [
    path('registro/', RegistroView.as_view(),name='registro'),
]