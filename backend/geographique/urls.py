from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaysViewSet, ProvinceViewSet, RegionViewSet, DistrictViewSet, CommuneViewSet, QuartierViewSet

router = DefaultRouter()
router.register(r'pays', PaysViewSet)
router.register(r'provinces', ProvinceViewSet)
router.register(r'regions', RegionViewSet)
router.register(r'districts', DistrictViewSet)
router.register(r'communes', CommuneViewSet)
router.register(r'quartiers', QuartierViewSet)

urlpatterns = [
    path('', include(router.urls)),
]