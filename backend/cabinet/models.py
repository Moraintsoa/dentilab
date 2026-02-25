#cabinet/models.py
from django.db import models

PLAN_ABONNEMENT_CHOICES = (
    ('standard', 'Standard'),
    ('premium', 'Premium'),
    ('pro', 'Professionnel'),
)

class Cabinet(models.Model):
    slug = models.SlugField(unique=True)
    nom = models.CharField(max_length=255)
    telephone = models.CharField(max_length=20)
    adresse = models.TextField()
    email = models.EmailField(unique=True)
    config_horaire = models.JSONField(default=dict)
    plan_abonnement = models.CharField(max_length=50, choices=PLAN_ABONNEMENT_CHOICES, default='standard')
    est_actif = models.BooleanField(default=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom 