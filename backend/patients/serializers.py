from rest_framework import serializers
from .models import Patient, Odontogramme, Dent, StatutDent, Radiographie

class StatutDentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatutDent
        fields = '__all__'
        
class DentSerializer(serializers.ModelSerializer):
    statut = StatutDentSerializer(read_only=True)
    
    class Meta:
        model = Dent
        fields = '__all__'

class OdontogrammeSerializer(serializers.ModelSerializer):
    dents = DentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Odontogramme
        fields = '__all__'

class RadiographieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Radiographie
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    odontogramme = OdontogrammeSerializer(read_only=True)
    radiographies = RadiographieSerializer(many=True, read_only=True)
    
    class Meta:
        model = Patient
        fields = '__all__'