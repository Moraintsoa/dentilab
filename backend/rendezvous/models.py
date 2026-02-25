# rendezvous/models.py
from django.db import models
from cabinet.models import Cabinet
from patients.models import Patient
from comptes.models import CustomUser
from django.core.exceptions import ValidationError

class RendezVous(models.Model):
    STATUS_CHOICES = [
        ('PREVU', 'Prévu'),
        ('TERMINE', 'Terminé'),
        ('ANNULE', 'Annulé'),
        ('ABSENT', 'Absent'),
    ]

    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, related_name="rendezvous")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="rendezvous")
    praticien = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="rendezvous_recus")
    debut = models.DateTimeField()
    fin = models.DateTimeField()
    raison = models.TextField(blank=True, null=True)
    statut = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PREVU')
    date_creation = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    
    def clean(self):
        chevochement = RendezVous.objects.filter(
            cabinet=self.cabinet,
            praticien=self.praticien,
            statut = 'PREVU',
            debut__lt=self.fin,
            fin__gt=self.debut
        ).exclude(pk=self.pk).exists()
        if chevochement:
            raise ValidationError("Il y a un chevauchement de rendez-vous pour ce praticien dans ce cabinet.")

    def __str__(self):
        return f"RDV {self.patient} le {self.debut.strftime('%d/%m à %H:%M')} - {self.statut}"