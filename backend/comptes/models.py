# comptes/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from geographique.models import Quartier


ROLE_CHOICES = (
    ('ADMIN', 'Admin SaaS'),
    ('CABINET', 'Cabinet Dentaire'),
    ('PATIENT', 'Patient'),
)


PLAN_ABONNEMENT_CHOICES = (
    ('standard', 'Standard'),
    ('premium', 'Premium'),
    ('pro', 'Professionnel'),
)


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email obligatoire.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("role", "ADMIN")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None

    quartier = models.ForeignKey(Quartier, on_delete=models.SET_NULL, blank=True, null=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    nom_cabinet = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    adresse = models.TextField(blank=True, null=True)
    plan_abonnement = models.CharField(
        max_length=50,
        choices=PLAN_ABONNEMENT_CHOICES,
        default='standard'
    )
    est_actif = models.BooleanField(default=True)
    
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        if self.role == "CABINET":
            return self.nom_cabinet
        return self.email