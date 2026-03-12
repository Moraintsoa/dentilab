# patients/views.py
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Patient, Odontogramme, Dent, StatutDent, Radiographie
from .serializers import (
    PatientSerializer,
    OdontogrammeSerializer,
    DentSerializer,
    StatutDentSerializer,
    RadiographieSerializer,
)
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from core.permissions import AppartientAuCabinet


class StatutDentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    serializer_class = StatutDentSerializer
    def get_queryset(self):
        return StatutDent.objects.filter(dent__odontogramme__patient__cabinet=self.request.user)


class DentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    serializer_class = DentSerializer
    def get_queryset(self):
        return Dent.objects.filter(odontogramme__patient__cabinet=self.request.user)


class OdontogrammeViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    serializer_class = OdontogrammeSerializer
    def get_queryset(self):
        return Odontogramme.objects.filter(patient__cabinet=self.request.user)


class RadiographieViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Radiographie.objects.all()
    def get_queryset(self):
        return Radiographie.objects.filter(patient__cabinet=self.request.user)


class PatientViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    serializer_class = PatientSerializer
    def get_queryset(self):
        return Patient.objects.filter(cabinet=self.request.user)
    
    # @action(detail=True, methods=["get"])
    # def odontogramme(self, request, pk=None):
    #     patient = self.get_object()

    #     odontogramme = (
    #         patient.odontogramme_patient
    #         .prefetch_related("dents__statuts")
    #     )

    #     serializer = OdontogrammeSerializer(odontogramme)
    #     return Response(serializer.data)
