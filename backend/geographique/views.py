from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Pays, Province, Region, District, Commune, Quartier
from .serializers import PaysSerializer, ProvinceSerializer, RegionSerializer, DistrictSerializer, CommuneSerializer, QuartierSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class PaysViewSet(ModelViewSet):
    queryset = Pays.objects.all()
    serializer_class = PaysSerializer
    
class ProvinceViewSet(ModelViewSet):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer
    
class RegionViewSet(ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    
class DistrictViewSet(ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer

class CommuneViewSet(ModelViewSet):
    queryset = Commune.objects.all()
    serializer_class = CommuneSerializer
    
class QuartierViewSet(ModelViewSet):
    queryset = Quartier.objects.all()
    serializer_class = QuartierSerializer
