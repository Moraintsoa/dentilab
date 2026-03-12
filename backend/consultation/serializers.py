# consultation/serializers.py
from rest_framework import serializers
from .models import Consultation, Traitement, TypeTraitement

class TypeTraitementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeTraitement
        fields = '__all__'

class TraitementSerializer(serializers.ModelSerializer):
    type_traitement = TypeTraitementSerializer(read_only=True)
    
    class Meta:
        model = Traitement
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    traitments = TraitementSerializer(many=True, read_only=True)
    
    class Meta:
        model = Consultation
        fields = '__all__'