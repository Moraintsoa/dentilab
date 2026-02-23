 'comptes'(from django.db import models
from django.contrib.auth.models import AbstractUser
from cabinet.models import Cabinet

# Create your models here.
ROLE_CHOICES = (
    ('dentiste', 'Dentiste'),
    ('assistant', 'Assistant'),
    ('admin', 'Admin'),
)
class CustomUser(AbstractUser):
    username = None
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, null=True, blank=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='dentiste', blank=True)  # Ex: 'dentiste', 'assistant', 'admin', etc.
    numero_ordre = models.CharField(max_length=100, blank=True, null=True)  # Numéro d'ordre pour les dentistes
    references = models.TextField(blank=True, null=True)  # Références pour les assistants
    est_dentiste = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []),
    'cabinet'(from django.db import models

# Create your models here.
PLAN_ABONNEMENT_CHOICES = (
    ('standard', 'Standard'),
    ('premium', 'Premium'),
    ('pro', 'Pro'),
)
class Cabinet(models.Model):
    slug = models.SlugField(unique=True)
    nom = models.CharField(max_length=255)
    telephone = models.CharField(max_length=20)
    adresse = models.TextField()
    email = models.EmailField(unique=True)
    config_horaire = models.JSONField(default=dict)  # Ex: {"lundi": "9h-17h", "mardi": "9h-17h", ...}
    plan_abonnement = models.CharField(max_length=50, choices=PLAN_ABONNEMENT_CHOICES, default='standard')  # Ex: 'standard', 'premium', etc.
    est_actif = models.BooleanField(default=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nom),
    'patients'(from django.db import models
from cabinet.models import Cabinet # On importe le cabinet pour lier le patient
from consultation.models import Consultation # On importe la consultation pour lier l'état de la dent
from comptes.models import CustomUser # On importe le CustomUser pour lier le soin au soignant

class Patient(models.Model):
    cabinet = models.ForeignKey(
        Cabinet, 
        on_delete=models.CASCADE, 
        related_name='patients'
    )

    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    genre = models.CharField(max_length=20, blank=True, null=True)
    telephone = models.CharField(max_length=20)
    
    anonymise = models.BooleanField(default=False) # Permet de masquer les données personnelles du patient pour les statistiques globales

    allergies = models.TextField(blank=True, null=True)
    antecedents = models.TextField(blank=True, null=True)
    mutuelle = models.CharField(max_length=255, blank=True, null=True)
    numero_securite_sociale = models.CharField(max_length=20, blank=True, null=True)

    est_public = models.BooleanField(default=False)
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"

TYPE_DENT_CHOICES = (
    ('dent_de_lait', 'Dent de lait'),
    ('dent_mixte', 'Dent mixte'),
    ('dent_permanente', 'Dent permanente'),
)


class Odontogramme(models.Model):
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, related_name="odontogramme_cabinet")
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name="odontogramme_patient")
    date_derniere_mise_a_jour = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Odontogramme de {self.patient}"

class Dent(models.Model):
    odontogramme = models.ForeignKey(Odontogramme,on_delete=models.CASCADE, related_name="odontogramme_dents")
    numero = models.IntegerField()
    type_dent = models.CharField(max_length=50, choices=TYPE_DENT_CHOICES)
    def __str__(self):
        return f"Dent {self.numero} - {self.odontogramme.patient}"


STATUT_DENT_CHOICES = (
    ('sain', 'Sain'),
    ('carie', 'Carie'),
    ('plombe', 'Plombé'),
    ('absente', 'Absente'),
    ('couronne', 'Couronne'),
    ('implant', 'Implant'),
    ('obturee', 'Obturée'),
    ('fracturee', 'Fracturée'),
    ('devitalisee', 'Dévitalisée'),
    ('bridge', 'Bridge'),
)
class StatutDent(models.Model):
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, related_name="statut_dent_cabinet")
    dent = models.ForeignKey(Dent, on_delete=models.CASCADE, related_name="dent_concerned")
    modifie_par = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="statut_dent_modifie_par")
    consultation = models.ForeignKey(Consultation,on_delete=models.CASCADE,related_name="StatutDent_consultation")
    statut = models.CharField(max_length=50,choices=STATUT_DENT_CHOICES)
    date_enregistrement = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.dent} - {self.statut}"

 

class Radiographie(models.Model):
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, related_name="radiographies_cabinet")
    consultation = models.ForeignKey(Consultation,on_delete=models.CASCADE,related_name="radiographies_consultation")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="radiographies_patient")
    image = models.ImageField(upload_to="radiographies/")
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Radiographie des dent du {self.patient} le {self.date.strftime('%d/%m/%Y')}"

    ),
    'consultation'(from django.db import models
from cabinet.models import Cabinet
from patients.models import Patient, Odontogramme, Dent
from comptes.models import CustomUser
from rendezvous.models import RendezVous

class TypeTraitementChoices(models.Model):
    nom = models.CharField(max_length=255, unique=True)
    cout = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nom

class TypeConsultationChoices(models.Model):
    nom = models.CharField(max_length=255, unique=True)
    cout = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nom

class Consultation(models.Model):
    # Liens (Relations)
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='consultations')
    effectue_par = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="consultations_realisees")
    rendezvous = models.ForeignKey(RendezVous, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Détails de la visite
    type_consultation = models.ForeignKey(TypeConsultationChoices, on_delete=models.SET_NULL, null=True, related_name="consultations")
    diagnostic = models.TextField()         # Ce que le dentiste a trouvé
    date = models.DateTimeField(auto_now_add=True)
    motif = models.CharField(max_length=255) # Pourquoi le patient vient (ex: Mal de dent)
    notes = models.TextField(blank=True, null=True) # Observations libres
    
    def __str__(self):
        return f"Consultation de {self.patient} le {self.date.strftime('%d/%m/%Y')}"

STATUT_TRAITEMENT_CHOICES = (
    ('planifie', 'Planifié'),
    ('en_cours', 'En cours'),
    ('termine', 'Terminé'),
)

class Traitement(models.Model):
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, related_name="traitements_cabinet")
    rendezvouz = models.ForeignKey(RendezVous, on_delete=models.SET_NULL, null=True, blank=True, related_name="traitements_rendezvous")
    dent = models.ForeignKey(Dent, on_delete=models.CASCADE, related_name="traitements")
    effectue_par = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,null=True,related_name="traitements_realises")
    type_traitement = models.ForeignKey(TypeTraitementChoices, on_delete=models.SET_NULL, null=True, related_name="traitements")
    statut = models.CharField(max_length=20,choices=STATUT_TRAITEMENT_CHOICES,default='planifie')
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Traitement sur {self.dent}"),
    'rendezvous'(from django.db import models
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
    praticien = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="rendezvous_reçus")  # Nom du dentiste ou assistant qui reçoit le patient
    debut = models.DateTimeField()
    fin = models.DateTimeField()
    raison = models.TextField(blank=True, null=True)
    statut = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PREVU')

    def __str__(self):
        return f"RDV {self.patient} le {self.debut.strftime('%d/%m à %H:%M')} pour {self.raison} - Statut: {self.statut}"),
    'facturation'(from django.db import models
from cabinet.models import Cabinet
from patients.models import Patient
from consultation.models import Consultation, Traitement
from comptes.models import CustomUser

class Factures(models.Model):
    STATUT_CHOICES = [
        ('IMPAYEE', 'Impayée'),
        ('PARTIELLE', 'Partielle'),
        ('PAYEE', 'Payée'),
    ]

    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    creer_par = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="factures_creees")
    numero_facture = models.CharField(max_length=50, unique=True) # Ex: FAC-2023-001
    montant_total = models.DecimalField(max_digits=10, decimal_places=2)
    statut = models.CharField(max_length=10, choices=STATUT_CHOICES, default='IMPAYEE')
    date_emission = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Facture {self.numero_facture} - {self.patient}"
    
class LigneFacture(models.Model):
    facture = models.ForeignKey(Factures, on_delete=models.CASCADE, related_name='lignes')
    est_consultation = models.BooleanField(default=False) # Permet de différencier les lignes liées à une consultation ou à un traitement
    est_traitement = models.BooleanField(default=False) # Permet de différencier les lignes liées à une consultation ou à un traitement
    consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True, blank=True, related_name="lignes_facture_consultation")
    traitement = models.ForeignKey(Traitement, on_delete=models.SET_NULL, null=True, blank=True, related_name="lignes_facture_traitement")
    description = models.CharField(max_length=255)
    montant = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.description} - {self.montant}€"
    
class Paiement(models.Model):
    METHODE_CHOICES = [
        ('ESPECES', 'Espèces'),
        ('MOBILE_MONEY', 'Mobile Money'),
        ('CARTE', 'Carte Bancaire'),
        ('VIREMENT', 'Virement'),
    ]
    TYPE_PAIMENT_CHOICES = [
        ('PARTIEL', 'Partiel'),
        ('TOTALITE', 'Totalité'),
    ]
    type_paiement = models.CharField(max_length=20, choices=TYPE_PAIMENT_CHOICES)
    facture = models.ForeignKey(Factures, on_delete=models.CASCADE, related_name='paiements')
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    methode = models.CharField(max_length=20, choices=METHODE_CHOICES)
    date_paiement = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Paiement de {self.montant} pour {self.facture.numero_facture}"),
    'inventaire'(from django.db import models
from cabinet.models import Cabinet
from consultation.models import Consultation, Traitement
from comptes.models import CustomUser

class Article(models.Model):
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, related_name='stocks')
    nom = models.CharField(max_length=255)
    categorie = models.CharField(max_length=100, blank=True)
    quantite_actuelle = models.IntegerField(default=0)
    seuil_alerte = models.IntegerField(default=5) # Pour prévenir quand le stock est bas
    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.nom} ({self.quantite_actuelle})"

class MouvementStock(models.Model):
    TYPE_MOUVEMENT = [
        ('ENTREE', 'Entrée (Achat)'),
        ('SORTIE', 'Sortie (Utilisation)'),
    ]
    consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True, blank=True, related_name="mouvements_stock_consultation")
    traitement = models.ForeignKey(Traitement, on_delete=models.SET_NULL, null=True, blank=True, related_name="mouvements_stock_traitement")
    effectue_par = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="mouvements_stock_realises")
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='mouvements')
    type = models.CharField(max_length=10, choices=TYPE_MOUVEMENT)
    quantite = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    commentaire = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.type} - {self.quantite} {self.produit.nom}"),