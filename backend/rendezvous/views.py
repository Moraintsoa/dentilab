from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import RendezVous
from .serializers import RendezVousSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions import AppartientAuCabinet

class RendezVousViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = RendezVous.objects.all()
    serializer_class = RendezVousSerializer
