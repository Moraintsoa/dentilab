# comptes/views.py
from django.template.loader import render_to_string
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer
from .models import CustomUser
from rest_framework import generics
from .serializers import RegisterUserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from core.permissions import AppartientAuCabinet
from rest_framework.response import Response
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == "ADMIN":
            return CustomUser.objects.all()
        elif user.role == "CABINET":
            return CustomUser.objects.filter(pk=user.pk)
        else:
            return CustomUser.objects.none()


class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]


def generate_secure_password(length=12):
    import string
    import random

    characters = string.ascii_letters + string.digits + string.punctuation
    return "".join(random.choice(characters) for i in range(length))


class PasswordResetView(generics.UpdateAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"error": "Utilisateur non trouvé."}, status=404)

        new_password = generate_secure_password()
        user.set_password(new_password)
        user.save()

        html_content = render_to_string(
            "password_reset_email.html",
            {
                "email": user.email,
                "new_password": new_password,
                "nom_cabinet": user.nom_cabinet or "Votre cabinet dentaire",
                "url_to_login": "http://localhost:5173",
            },
        )
        text_content = strip_tags(html_content)
        
        try:
            email_message = EmailMultiAlternatives(
                subject="Réinitialisation de votre mot de passe",
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[user.email]
            )
            email_message.attach_alternative(html_content, "text/html")
            email_message.send(fail_silently=False)
            return Response({"message": "Email de réinitialisation envoyé."}, status=200)
        except Exception as e:
            return Response({"error": "Erreur lors de l'envoi de l'email."}, status=500)
