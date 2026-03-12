# patients/models.py
from django.db import models
from comptes.models import CustomUser

# ═══════════════════════════════════════════════════════════════
#  DICTIONNAIRES FDI — Noms des dents par position
# ═══════════════════════════════════════════════════════════════

NOMS_DENTS_PERMANENTES = {
    1: 'Incisive centrale',
    2: 'Incisive latérale',
    3: 'Canine',
    4: '1ère prémolaire',
    5: '2ème prémolaire',
    6: '1ère molaire',
    7: '2ème molaire',
    8: '3ème molaire (sagesse)',
}



QUADRANTS = {
    1: 'Supérieure droit',
    2: 'Supérieure gauche',
    3: 'Inférieure gauche',
    4: 'Inférieure droite',
}


# ═══════════════════════════════════════════════════════════════
#  CHOICES
# ═══════════════════════════════════════════════════════════════

TYPE_DENT_CHOICES = (
    ('dent_permanente', 'Dent permanente'),
)

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


# ═══════════════════════════════════════════════════════════════
#  MODELS
# ═══════════════════════════════════════════════════════════════

class Patient(models.Model):
    TYPE_GENRE=(
        ('Homme','Homme'),
        ('Femme','Femme'),
    )
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="patient_profile"
    )
    cabinet = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="patients",
        limit_choices_to={"role": "CABINET"}
    )
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    genre = models.CharField(max_length=20, choices=TYPE_GENRE, blank=True, null=True)
    type_dent = models.CharField(max_length=50, choices=TYPE_DENT_CHOICES, default='dent_permanente')
    telephone = models.CharField(max_length=20)
    anonymise = models.BooleanField(default=False)
    allergies = models.TextField(blank=True, null=True)
    antecedents = models.TextField(blank=True, null=True)
    mutuelle = models.CharField(max_length=255, blank=True, null=True)
    numero_securite_sociale = models.CharField(max_length=20, blank=True, null=True)
    est_public = models.BooleanField(default=False)
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"


class Odontogramme(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name="odontogramme_patient")
    nombre_total_dents = models.IntegerField(default=32)
    date_derniere_mise_a_jour = models.DateTimeField(auto_now=True)

    @property
    def cabinet(self):
        return self.patient.cabinet

    def __str__(self):
        return f"Odontogramme de {self.patient}"


class Dent(models.Model):
    odontogramme = models.ForeignKey(Odontogramme, on_delete=models.CASCADE, related_name="dents")
    numero = models.IntegerField()

    # ── Properties FDI ──────────────────────────────────────────

    @property
    def quadrant(self):
        """1er chiffre du numéro FDI → indique le quadrant."""
        return self.numero // 10

    @property
    def position(self):
        """2ème chiffre du numéro FDI → position dans le quadrant."""
        return self.numero % 10


    @property
    def nom(self):
        """
        Nom clinique de la dent déduit du numéro FDI.
        Ex: 16 → '1ère molaire'
        """
        noms =  NOMS_DENTS_PERMANENTES
        return noms.get(self.position, 'Inconnu')

    @property
    def nom_quadrant(self):
        """Nom du quadrant auquel appartient la dent."""
        return QUADRANTS.get(self.quadrant, 'Inconnu')

    @property
    def nom_complet(self):
        """
        Nom complet avec quadrant.
        Ex: 16 → '1ère molaire — Maxillaire droit'
        """
        return f"{self.nom} — {self.nom_quadrant}"


    @property
    def label(self):
        """
        Label d'affichage complet pour le frontend.
        Permanente : '16 — 1ère molaire'
        """
        return f"{self.numero} — {self.nom}"

    # ── Statut ──────────────────────────────────────────────────

    @property
    def statut_actuel(self):
        """
        Retourne le dernier statut enregistré.
        'sain' par défaut si aucun StatutDent n'existe encore.
        Aucune écriture en base.
        """
        dernier = self.statuts.order_by('-date_enregistrement').first()
        return dernier.statut if dernier else 'sain'

    @property
    def historique(self):
        """Historique complet des changements d'état, du plus récent au plus ancien."""
        return self.statuts.order_by('-date_enregistrement')

    def __str__(self):
        return f"{self.label} · {self.odontogramme.patient}"


class StatutDent(models.Model):
    """
    Historique des changements d'état d'une dent.
    Créé UNIQUEMENT quand un praticien modifie l'état lors d'une consultation.
    État par défaut = 'sain' via Dent.statut_actuel (aucun enregistrement nécessaire).
    """
    dent = models.ForeignKey(Dent, on_delete=models.CASCADE, related_name="statuts")
    modifie_par = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="statuts_dent_modifies"
    )
    consultation = models.ForeignKey(
        'consultation.Consultation', on_delete=models.CASCADE,
        null=True, blank=True,
        related_name="statuts_dent"
    )
    statut = models.CharField(max_length=50, choices=STATUT_DENT_CHOICES)
    date_enregistrement = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_enregistrement']

    def __str__(self):
        return f"Dent {self.dent.numero} → {self.statut} ({self.date_enregistrement.strftime('%d/%m/%Y')})"


class Radiographie(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="radiographies")
    consultation = models.ForeignKey(
        'consultation.Consultation', on_delete=models.CASCADE,
        related_name="radiographies"
    )
    image = models.ImageField(upload_to="radiographies/")
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Radiographie de {self.patient} le {self.date.strftime('%d/%m/%Y')}"