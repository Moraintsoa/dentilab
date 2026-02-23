# consultation/models.py

from django.db import models
from django.db.models import Sum
from cabinet.models import Cabinet
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
        Cabinet,
        on_delete=models.CASCADE,
        related_name="consultations"
    )

    odontogramme = models.ForeignKey(
        "patients.Odontogramme",
        on_delete=models.CASCADE,
        related_name="consultations"
    )

    effectue_par = models.ForeignKey(
        CustomUser,
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


# # consultation/models.py

# from django.db import models
# from django.db.models import Sum
# from cabinet.models import Cabinet
# from comptes.models import CustomUser
# from rendezvous.models import RendezVous


# # ===============================
# # STATUTS
# # ===============================

# STATUT_ACTE_CHOICES = (
#     ("en_cours", "En cours"),
#     ("termine", "Terminé"),
#     ("annule", "Annulé"),
# )

# STATUT_TRAITEMENT_CHOICES = (
#     ("planifie", "Planifié"),
#     ("en_cours", "En cours"),
#     ("termine", "Terminé"),
# )


# # ===============================
# # ACTE (PANIER MEDICAL)
# # ===============================

# class Acte(models.Model):

#     cabinet = models.ForeignKey(
#         Cabinet,
#         on_delete=models.CASCADE,
#         related_name="actes"
#     )

#     odontogramme = models.ForeignKey(
#         "patients.Odontogramme",
#         on_delete=models.CASCADE,
#         related_name="actes"
#     )

#     effectue_par = models.ForeignKey(
#         CustomUser,
#         on_delete=models.CASCADE,
#         related_name="actes_effectues"
#     )

#     rendezvous = models.ForeignKey(
#         RendezVous,
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True
#     )

#     statut = models.CharField(
#         max_length=20,
#         choices=STATUT_ACTE_CHOICES,
#         default="en_cours"
#     )

#     # 👇 Boolean pour appliquer ou non le coût consultation
#     appliquer_cout_consultation = models.BooleanField(default=False)

#     date_creation = models.DateTimeField(auto_now_add=True)

#     @property
#     def cout_total(self):
#         total = 0

#         # Consultation
#         if self.appliquer_cout_consultation and hasattr(self, "consultation"):
#             total += self.consultation.cout

#         # Traitements
#         total_traitements = self.traitements.aggregate(
#             total=Sum("cout")
#         )["total"] or 0

#         total += total_traitements

#         return total

#     def save(self, *args, **kwargs):
#         is_new = self.pk is None
#         super().save(*args, **kwargs)

#         # 🔥 Création automatique consultation
#         if is_new:
#             Consultation.objects.create(
#                 acte=self,
#                 diagnostic="",
#                 motif="Consultation initiale",
#                 cout=0
#             )

#     def __str__(self):
#         return f"Acte #{self.id}"


# # ===============================
# # CONSULTATION (1 obligatoire)
# # ===============================

# class Consultation(models.Model):

#     acte = models.OneToOneField(
#         Acte,
#         on_delete=models.CASCADE,
#         related_name="consultation",
#     )

#     diagnostic = models.TextField(blank=True, null=True)
#     motif = models.CharField(max_length=255, blank=True, null=True)

#     cout = models.DecimalField(
#         max_digits=10,
#         decimal_places=2
#     )

#     date = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Consultation Acte #{self.acte.id}"


# # ===============================
# # CATALOGUE TRAITEMENT
# # ===============================

# class TypeTraitement(models.Model):
#     categorie = models.CharField(max_length=255, blank=True, null=True)
#     nom = models.CharField(max_length=255, unique=True)
#     description = models.TextField(blank=True, null=True)
#     cout = models.DecimalField(max_digits=10,decimal_places=2)
#     est_actif = models.BooleanField(default=False)

#     def __str__(self):
#         return f"{self.nom} ({self.cout}Ar)"


# # ===============================
# # TRAITEMENT (AJOUT AU PANIER)
# # ===============================

# class Traitement(models.Model):

#     acte = models.ForeignKey(
#         Acte,
#         on_delete=models.CASCADE,
#         related_name="traitements"
#     )

#     dent = models.ForeignKey(
#         "patients.Dent",
#         on_delete=models.CASCADE,
#         related_name="traitements"
#     )

#     type_traitement = models.ForeignKey(
#         TypeTraitement,
#         on_delete=models.PROTECT,
#         related_name="traitements"
#     )

#     statut = models.CharField(
#         max_length=20,
#         choices=STATUT_TRAITEMENT_CHOICES,
#         default="planifie"
#     )

#     cout = models.DecimalField(
#         max_digits=10,
#         decimal_places=2,
#         blank=True,
#         null=True
#     )

#     date = models.DateTimeField(auto_now_add=True)

#     def save(self, *args, **kwargs):
#         # 🔥 prix automatique depuis catalogue
#         if not self.cout:
#             self.cout = self.type_traitement.cout
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"{self.type_traitement} - Dent {self.dent}"