# rendezvous/models.py
from django.db import models
from cabinet.models import Cabinet
from patients.models import Patient
from comptes.models import CustomUser

class RendezVous(models.Model):
    STATUS_CHOICES = [
        ('PREVU', 'Prévu'),
        ('TERMINE', 'Terminé'),
        ('ANNULE', 'Annulé'),
        ('ABSENT', 'Absent'),
    ]

    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    praticien = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="rendezvous_recus")
    debut = models.DateTimeField()
    fin = models.DateTimeField()
    raison = models.TextField(blank=True, null=True)
    statut = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PREVU')

    def __str__(self):
        return f"RDV {self.patient} le {self.debut.strftime('%d/%m à %H:%M')} - {self.statut}"




# from django.db import models
# from django.utils import timezone

# from cabinet.models import Cabinet
# from patients.models import Patient
# from comptes.models import CustomUser

# STATUT_RDV_CHOICES = (
#     ('prevu', 'Prévu'),
#     ('confirme', 'Confirmé'),
#     ('termine', 'Terminé'),
#     ('annule', 'Annulé'),
#     ('absent', 'Absent / no-show'),
# )

# class RendezVous(models.Model):
#     cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE)
#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='rendezvous')
#     praticien = models.ForeignKey(
#         CustomUser,
#         on_delete=models.PROTECT,
#         related_name='rendezvous_donnees',
#         limit_choices_to={'role': 'dentiste'}  # optionnel mais utile
#     )
#     debut = models.DateTimeField()
#     fin = models.DateTimeField()
#     raison = models.CharField(max_length=250, blank=True)
#     statut = models.CharField(max_length=20, choices=STATUT_RDV_CHOICES, default='prevu')
#     notes = models.TextField(blank=True)
#     date_creation = models.DateTimeField(default=timezone.now)

#     class Meta:
#         ordering = ['debut']
#         indexes = [models.Index(fields=['debut', 'praticien'])]

#     def __str__(self):
#         return f"RDV {self.patient} – {self.debut:%d/%m/%Y %H:%M} ({self.statut})"

#     def duree_minutes(self):
#         return (self.fin - self.debut).total_seconds() / 60