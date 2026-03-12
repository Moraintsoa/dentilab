#facturation/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from consultation.models import Traitement, Consultation
from .models import Facture


@receiver(post_save, sender=Traitement)
@receiver(post_delete, sender=Traitement)
def recalculer_facture_apres_traitement(sender, instance, **kwargs):
    try:
        facture = instance.consultation.facture
        facture.recalculer_montant_et_statut()
    except Facture.DoesNotExist:
        pass

@receiver(post_save, sender=Consultation)
def creer_facture_apres_consultation(sender, instance, created, **kwargs):
    if created:
        Facture.objects.create(
            cabinet=instance.cabinet,
            patient=instance.odontogramme.patient,
            consultation=instance,
        )