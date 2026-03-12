# consultation/urls.py
from django.urls import path, include
from .views import TypeTraitementViewSet, TraitementViewSet, ConsultationViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'types-traitement', TypeTraitementViewSet, basename='type-traitement')
router.register(r'traitements', TraitementViewSet, basename='traitement')
router.register(r'consultations', ConsultationViewSet, basename='consultation')

urlpatterns = [
    
    path('', include(router.urls)),
]