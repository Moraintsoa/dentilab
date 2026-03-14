from rest_framework import serializers
from .models import Pays, Province, Region, District, Commune, Quartier


class QuartierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quartier
        fields = '__all__'
        
class CommuneSerializer(serializers.ModelSerializer):
    quartiers = QuartierSerializer(many=True, read_only=True)
    
    class Meta:
        model = Commune
        fields = '__all__'
        
class DistrictSerializer(serializers.ModelSerializer):
    communes = CommuneSerializer(many=True, read_only=True)
    
    class Meta:
        model = District
        fields = '__all__'

class RegionSerializer(serializers.ModelSerializer):
    districts = DistrictSerializer(many=True, read_only=True)
    
    class Meta:
        model = Region
        fields = '__all__'

class ProvinceSerializer(serializers.ModelSerializer):
    regions = RegionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Province
        fields = '__all__'
        
class PaysSerializer(serializers.ModelSerializer):
    provinces = ProvinceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Pays
        fields = '__all__'