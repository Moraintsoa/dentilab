from django.urls import path, include
from .views import RendezVousViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'rendezvous', RendezVousViewSet, basename='rendezvous')

urlpatterns = [
    path('', include(router.urls)),
]