from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Consultation, Traitement, TypeTraitement
from .serializers import ConsultationSerializer, TraitementSerializer, TypeTraitementSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions import EstAdmin, EstDentiste, EstAssistant, EstPatient, EstDentisteOuAssistant, AppartientAuCabinet


class TypeTraitementViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = TypeTraitement.objects.all()
    serializer_class = TypeTraitementSerializer
    
class TraitementViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Traitement.objects.all()
    serializer_class = TraitementSerializer
    
class ConsultationViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
