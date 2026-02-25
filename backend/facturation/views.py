from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Facture, Paiement
from .serializers import FactureSerializer, PaiementSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions import AppartientAuCabinet

class FactureViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Facture.objects.all()
    serializer_class = FactureSerializer
    
class PaiementViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerializer


