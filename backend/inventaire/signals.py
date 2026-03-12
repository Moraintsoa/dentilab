# inventaire/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MouvementStock

@receiver(post_save, sender=MouvementStock)
def mettre_a_jour_stock(sender, instance, created, **kwargs):
    """
    Met à jour quantite_actuelle de l'article après chaque mouvement.
    ENTREE → on ajoute, SORTIE → on soustrait.
    On utilise update() pour éviter une boucle de signal.
    """
    if not created:
        return  # On ne recalcule que sur création (pas modification)

    article = instance.article
    from django.db.models import F
    if instance.type == 'ENTREE':
        article.__class__.objects.filter(pk=article.pk).update(
            quantite_actuelle=F('quantite_actuelle') + instance.quantite
        )
    elif instance.type == 'SORTIE':
        article.__class__.objects.filter(pk=article.pk).update(
            quantite_actuelle=F('quantite_actuelle') - instance.quantite
        )