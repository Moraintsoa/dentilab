# inventaire/models.py
from django.db import models
from cabinet.models import Cabinet
from consultation.models import Consultation, Traitement
from comptes.models import CustomUser


class Article(models.Model):
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, related_name='stocks')
    nom = models.CharField(max_length=255)
    categorie = models.CharField(max_length=100, blank=True)
    quantite_actuelle = models.IntegerField(default=0)
    seuil_alerte = models.IntegerField(default=5)
    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.nom} ({self.quantite_actuelle})"

    @property
    def est_en_alerte(self):
        return self.quantite_actuelle <= self.seuil_alerte


class MouvementStock(models.Model):
    TYPE_MOUVEMENT = [
        ('ENTREE', 'Entrée (Achat)'),
        ('SORTIE', 'Sortie (Utilisation)'),
    ]

    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='mouvements')
    consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True, blank=True, related_name="mouvements_stock")
    traitement = models.ForeignKey(Traitement, on_delete=models.SET_NULL, null=True, blank=True, related_name="mouvements_stock")
    effectue_par = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="mouvements_stock_realises")
    type = models.CharField(max_length=10, choices=TYPE_MOUVEMENT)
    quantite = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    commentaire = models.CharField(max_length=255, blank=True)

    def __str__(self):
        # ✅ Corrigé : self.produit.nom → self.article.nom
        return f"{self.type} - {self.quantite} {self.article.nom}"