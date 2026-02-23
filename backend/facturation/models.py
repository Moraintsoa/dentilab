# facturation/models.py

from django.db import models
from django.db.models import Sum
from cabinet.models import Cabinet
from patients.models import Patient
from consultation.models import Consultation, Traitement
from comptes.models import CustomUser


class Facture(models.Model):

    STATUT_CHOICES = [
        ('IMPAYEE', 'Impayée'),
        ('PARTIELLE', 'Partielle'),
        ('PAYEE', 'Payée'),
    ]

    cabinet = models.ForeignKey(
        Cabinet,
        on_delete=models.CASCADE,
        related_name="factures"
    )

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="factures"
    )

    consultation = models.OneToOneField(
        Consultation,
        on_delete=models.PROTECT,
        related_name="facture"
    )

    creer_par = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        related_name="factures_creees"
    )

    numero_facture = models.CharField(
        max_length=50,
        unique=True
    )

    montant_total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    statut = models.CharField(
        max_length=10,
        choices=STATUT_CHOICES,
        default='IMPAYEE'
    )

    date_emission = models.DateTimeField(auto_now_add=True)

    def recalculer_montant(self):
        self.montant_total = self.consultation.total
        self.save(update_fields=["montant_total"])

    def recalculer_statut(self):
        total_paye = self.paiements.aggregate(
            total=Sum("montant")
        )["total"] or 0

        if total_paye == 0:
            self.statut = "IMPAYEE"
        elif total_paye >= self.montant_total:
            self.statut = "PAYEE"
        else:
            self.statut = "PARTIELLE"

        self.save(update_fields=["statut"])

    def __str__(self):
        return f"Facture {self.numero_facture}"


class Paiement(models.Model):

    METHODE_CHOICES = [
        ('ESPECES', 'Espèces'),
        ('MOBILE_MONEY', 'Mobile Money'),
        ('CARTE', 'Carte Bancaire'),
        ('VIREMENT', 'Virement'),
    ]

    facture = models.ForeignKey(
        Facture,
        on_delete=models.CASCADE,
        related_name="paiements"
    )

    montant = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    methode = models.CharField(
        max_length=20,
        choices=METHODE_CHOICES
    )

    date_paiement = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.facture.recalculer_statut()

    def __str__(self):
        return f"Paiement {self.montant} - {self.facture.numero_facture}"