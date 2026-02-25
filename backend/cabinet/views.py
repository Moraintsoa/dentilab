from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Cabinet
from .serializers import CabinetSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions import EstAdmin

# Create your views here.

class CabinetViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CabinetSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Cabinet.objects.all()
        elif user.role in ['dentiste', 'assistant']:
            return Cabinet.objects.filter(id=user.cabinet_id)
        else:
            return Cabinet.objects.none()
    
    

    