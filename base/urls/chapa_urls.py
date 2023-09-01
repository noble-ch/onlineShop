# myapp/urls.py
from django.urls import path
from base.views import chapa_views as views

urlpatterns = [
    path('', views.api_request_view, name='api_request'),
]
