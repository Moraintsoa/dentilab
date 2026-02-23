from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from consultation.models import Traitement
from .models import Facture


@receiver(post_save, sender=Traitement)
@receiver(post_delete, sender=Traitement)
def recalculer_facture_apres_traitement(sender, instance, **kwargs):
    consultation = instance.consultation

    try:
        facture = consultation.facture
        facture.recalculer_montant()
        facture.recalculer_statut()
    except Facture.DoesNotExist:
        pass