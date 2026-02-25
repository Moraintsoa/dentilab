from django.urls import path, include
from .views import CabinetViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'cabinets', CabinetViewSet, basename='cabinet')

urlpatterns = [
    path('', include(router.urls)),
]

#Routes disponibles:
# GET /api/cabinets/ : Liste tous les cabinets
# POST /api/cabinets/ : Crée un nouveau cabinet
# GET /api/cabinets/{id}/ : Récupère les détails d'un cabinet spécifique
# PUT /api/cabinets/{id}/ : Met à jour un cabinet spécifique
# DELETE /api/cabinets/{id}/ : Supprime un cabinet spécifique