# comptes/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from cabinet.models import Cabinet

ROLE_CHOICES = (
    ('dentiste', 'Dentiste'),
    ('assistant', 'Assistant'),
    ('admin', 'Admin'),
)


class CustomUserManager(BaseUserManager):
    """Manager qui utilise email à la place de username."""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'adresse email est obligatoire.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Le superuser doit avoir is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Le superuser doit avoir is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None  # On supprime le champ username
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, null=True, blank=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='dentiste', blank=True)
    numero_ordre = models.CharField(max_length=100, blank=True, null=True)
    references = models.TextField(blank=True, null=True)

    objects = CustomUserManager()  # ✅ Notre manager personnalisé

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Pas de champs supplémentaires demandés au createsuperuser

    @property
    def est_dentiste(self):
        return self.role == 'dentiste'

    def __str__(self):
        return self.email