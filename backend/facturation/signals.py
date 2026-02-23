# from django.db.models.signals import post_save, post_delete
# from django.dispatch import receiver
# from .models import LigneFacture, Paiement


# # ──────────────────────────────────────────────
# # Recalcul automatique du montant_total de la facture
# # à chaque ajout / modification / suppression d'une LigneFacture
# # ──────────────────────────────────────────────

# @receiver(post_save, sender=LigneFacture)
# def recalculer_montant_apres_ajout_ligne(sender, instance, **kwargs):
#     instance.facture.recalculer_montant()


# @receiver(post_delete, sender=LigneFacture)
# def recalculer_montant_apres_suppression_ligne(sender, instance, **kwargs):
#     instance.facture.recalculer_montant()


# # ──────────────────────────────────────────────
# # Recalcul automatique du statut de la facture
# # à chaque paiement ajouté / modifié / supprimé
# # ──────────────────────────────────────────────

# @receiver(post_save, sender=Paiement)
# def recalculer_statut_apres_paiement(sender, instance, **kwargs):
#     instance.facture.recalculer_statut()


# @receiver(post_delete, sender=Paiement)
# def recalculer_statut_apres_suppression_paiement(sender, instance, **kwargs):
#     instance.facture.recalculer_statut()