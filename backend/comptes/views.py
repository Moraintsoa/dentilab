from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated
from core.permissions import EstAdmin, EstDentiste, EstAssistant, EstPatient, EstDentisteOuAssistant


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class UserViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, EstDentisteOuAssistant]
    serializer_class = CustomUserSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return CustomUser.objects.all()
        elif user.role == 'dentiste':
            return CustomUser.objects.filter(cabinet=user.cabinet)
        else:
            return CustomUser.objects.none()