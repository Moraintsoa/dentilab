from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Patient, Odontogramme, Dent, StatutDent, Radiographie
from .serializers import PatientSerializer, OdontogrammeSerializer, DentSerializer, StatutDentSerializer, RadiographieSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions import EstAdmin, EstDentiste, EstAssistant, EstPatient, EstDentisteOuAssistant, AppartientAuCabinet

class StatutDentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = StatutDent.objects.all()
    serializer_class = StatutDentSerializer
    
class DentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Dent.objects.all()
    serializer_class = DentSerializer

class OdontogrammeViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Odontogramme.objects.all()
    serializer_class = OdontogrammeSerializer

class RadiographieViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Radiographie.objects.all()
    serializer_class = RadiographieSerializer

class PatientViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
