# consultation/models.py

from django.db import models
from django.db.models import Sum
from comptes.models import CustomUser
from rendezvous.models import RendezVous


# ===============================
# CONSULTATION
# ===============================

class Consultation(models.Model):

    STATUT_CHOICES = (
        ("ouverte", "Ouverte"),
        ("validee", "Validée"),
        ("annulee", "Annulée"),
    )

    cabinet = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="consultations",
        limit_choices_to={"role": "CABINET"}
    )

    odontogramme = models.ForeignKey(
        "patients.Odontogramme",
        on_delete=models.CASCADE,
        related_name="consultations"
    )

    rendezvous = models.ForeignKey(
        RendezVous,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    diagnostic = models.TextField(blank=True, null=True)
    motif = models.CharField(max_length=255, blank=True, null=True)

    appliquer_frais = models.BooleanField(default=False)

    frais = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    statut = models.CharField(
        max_length=20,
        choices=STATUT_CHOICES,
        default="ouverte"
    )

    date_creation = models.DateTimeField(auto_now_add=True)

    @property
    def total(self):
        total = 0

        if self.appliquer_frais:
            total += self.frais

        total_traitements = self.traitements.aggregate(
            total=Sum("cout")
        )["total"] or 0

        return total + total_traitements

    def __str__(self):
        return f"Consultation #{self.id}"


# ===============================
# CATALOGUE TRAITEMENT
# ===============================

class TypeTraitement(models.Model):

    categorie = models.CharField(max_length=255, blank=True, null=True)

    nom = models.CharField(
        max_length=255,
        unique=True
    )

    description = models.TextField(blank=True, null=True)

    cout = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    est_actif = models.BooleanField(default=True)
    date_creation = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return f"{self.nom} ({self.cout} Ar)"


# ===============================
# TRAITEMENT (PANIER)
# ===============================

class Traitement(models.Model):

    STATUT_CHOICES = (
        ("planifie", "Planifié"),
        ("en_cours", "En cours"),
        ("termine", "Terminé"),
    )

    consultation = models.ForeignKey(
        Consultation,
        on_delete=models.CASCADE,
        related_name="traitements"
    )

    dent = models.ForeignKey(
        "patients.Dent",
        on_delete=models.CASCADE,
        related_name="traitements"
    )

    type_traitement = models.ForeignKey(
        TypeTraitement,
        on_delete=models.PROTECT,
        related_name="traitements"
    )

    statut = models.CharField(
        max_length=20,
        choices=STATUT_CHOICES,
        default="planifie"
    )

    cout = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.cout:
            self.cout = self.type_traitement.cout
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.type_traitement.nom} - Dent {self.dent.numero}"