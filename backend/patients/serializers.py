# patients/serializers.py
from rest_framework import serializers
from .models import Patient, Odontogramme, Dent, StatutDent, Radiographie

class StatutDentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatutDent
        fields = '__all__'
        read_only_fields = ['modifie_par']
        
class DentSerializer(serializers.ModelSerializer):
    nom_complet = serializers.SerializerMethodField()
    statut_actuel = serializers.SerializerMethodField()
    historique = StatutDentSerializer(many=True, read_only=True)

    class Meta:
        model = Dent
        fields = '__all__'
    def get_nom_complet(self, obj):
        return obj.nom_complet
    
    def get_statut_actuel(self, obj):
        return obj.statut_actuel

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
        read_only_fields = ['cabinet']