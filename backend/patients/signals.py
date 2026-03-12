# patients/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Patient, Odontogramme, Dent, StatutDent

# ═══════════════════════════════════════════════════════════════
#  CONFIGURATION FDI PAR TYPE DE DENTURE
# ═══════════════════════════════════════════════════════════════

DENTS_PAR_TYPE = {

    # ─── PERMANENTE ─── 32 dents · Q1-Q4 · sagesses incluses
    'dent_permanente': {
        'total': 32,
        'numeros': [
            18, 17, 16, 15, 14, 13, 12, 11,   # Q1 — Maxillaire droit
            21, 22, 23, 24, 25, 26, 27, 28,   # Q2 — Maxillaire gauche
            31, 32, 33, 34, 35, 36, 37, 38,   # Q3 — Mandibule gauche
            41, 42, 43, 44, 45, 46, 47, 48,   # Q4 — Mandibule droite
        ],
    },
}


# ═══════════════════════════════════════════════════════════════
#  SIGNAL — Patient sauvegardé → Odontogramme + Dents
# ═══════════════════════════════════════════════════════════════

@receiver(post_save, sender=Patient)
def creer_odontogramme_et_dents_et_statuts(sender, instance, created, **kwargs):
    """
    ▶ Création patient   → crée Odontogramme + toutes les Dents
    ▶ type_dent modifié  → supprime les anciennes dents et recrée selon le nouveau type

    Les noms/labels des dents sont calculés dynamiquement via les
    properties du modèle Dent (nom, nom_complet, label...) — rien de stocké.
    Aucun StatutDent créé ici : état 'sain' implicite via Dent.statut_actuel.
    """
    config = DENTS_PAR_TYPE.get(instance.type_dent)
    if not config:
        return

    if created:
        odontogramme = Odontogramme.objects.create(
            patient=instance,
            nombre_total_dents=config['total'],
        )
        _creer_dents(odontogramme, config['numeros'])

    else:
        odontogramme, odo_created = Odontogramme.objects.get_or_create(
            patient=instance,
            defaults={'nombre_total_dents': config['total']},
        )

        if odo_created:
            _creer_dents(odontogramme, config['numeros'])
        elif odontogramme.nombre_total_dents != config['total']:
            # type_dent a changé → recréation complète
            # le CASCADE supprime automatiquement les StatutDent liés
            odontogramme.dents.all().delete()
            odontogramme.nombre_total_dents = config['total']
            odontogramme.save(update_fields=['nombre_total_dents'])
            _creer_dents(odontogramme, config['numeros'])


# ═══════════════════════════════════════════════════════════════
#  HELPER
# ═══════════════════════════════════════════════════════════════

def _creer_dents(odontogramme, numeros):
    """
    Crée toutes les dents en une seule requête SQL via bulk_create.
    Les noms sont des properties calculées → rien à stocker ici.
    """
    dents = [Dent(odontogramme=odontogramme, numero=num) for num in numeros]
    Dent.objects.bulk_create(dents)