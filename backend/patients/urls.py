from django.urls import path, include
from .views import PatientViewSet, OdontogrammeViewSet, DentViewSet, StatutDentViewSet, RadiographieViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'odontogrammes', OdontogrammeViewSet, basename='odontogramme')
router.register(r'dents', DentViewSet, basename='dent')
router.register(r'statut_dents', StatutDentViewSet, basename='statut_dent')
router.register(r'radiographies', RadiographieViewSet, basename='radiographie')

urlpatterns = [
    path('', include(router.urls)),
]