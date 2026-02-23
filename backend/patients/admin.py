# patients/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Patient, Odontogramme, Dent, StatutDent, Radiographie


# ═══════════════════════════════════════════════════════════════
#  INLINE — Statut Dent (avec ajout possible)
# ═══════════════════════════════════════════════════════════════

class StatutDentInline(admin.TabularInline):
    """
    Historique + ajout de statut directement depuis la page d'une Dent.
    Les champs date_enregistrement, modifie_par sont en readonly.
    consultation reste optionnel (null=True dans le modèle).
    """
    model = StatutDent
    extra = 1              # ✅ 1 ligne vide pour pouvoir ajouter un nouveau statut
    can_delete = False
    ordering = ('-date_enregistrement',)
    fields = ('statut', 'modifie_par', 'consultation', 'date_enregistrement')
    readonly_fields = ('date_enregistrement',)   # auto_now_add → toujours readonly


# ═══════════════════════════════════════════════════════════════
#  INLINE — Dents dans Odontogramme
# ═══════════════════════════════════════════════════════════════

class DentInline(admin.TabularInline):
    model = Dent
    extra = 0
    can_delete = False
    readonly_fields = ('numero', 'get_nom', 'get_quadrant', 'get_label', 'get_statut_actuel')
    fields = readonly_fields

    def get_nom(self, obj):
        return obj.nom if obj.numero is not None else '—'
    get_nom.short_description = 'Nom'

    def get_quadrant(self, obj):
        return obj.nom_quadrant if obj.numero is not None else '—'
    get_quadrant.short_description = 'Quadrant'

    def get_label(self, obj):
        return obj.label if obj.numero is not None else '—'
    get_label.short_description = 'Label FDI'

    def get_statut_actuel(self, obj):
        if obj.numero is None:
            return '—'
        statut = obj.statut_actuel
        couleurs = {
            'sain':       '#2d7a4f',
            'carie':      '#c0392b',
            'plombe':     '#2563eb',
            'absente':    '#64748b',
            'couronne':   '#b8860b',
            'implant':    '#475569',
            'obturee':    '#2563eb',
            'fracturee':  '#9f1239',
            'devitalisee':'#dc6d1a',
            'bridge':     '#7c3aed',
        }
        couleur = couleurs.get(statut, '#333')
        return format_html(
            '<span style="color:{};font-weight:600">● {}</span>',
            couleur, statut.capitalize()
        )
    get_statut_actuel.short_description = 'Statut actuel'


# ═══════════════════════════════════════════════════════════════
#  INLINE — Odontogramme dans Patient
# ═══════════════════════════════════════════════════════════════

class OdontogrammeInline(admin.StackedInline):
    model = Odontogramme
    extra = 0
    max_num = 1
    can_delete = False
    readonly_fields = ('nombre_total_dents', 'date_derniere_mise_a_jour')

    def has_add_permission(self, request, obj=None):
        # Créé uniquement par le signal → jamais manuellement
        return False


# ═══════════════════════════════════════════════════════════════
#  INLINE — Radiographies dans Patient
# ═══════════════════════════════════════════════════════════════

class RadiographieInline(admin.TabularInline):
    model = Radiographie
    extra = 0
    can_delete = False
    readonly_fields = ('image', 'consultation', 'description', 'date')
    fields = readonly_fields


# ═══════════════════════════════════════════════════════════════
#  PATIENT
# ═══════════════════════════════════════════════════════════════

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = (
        'nom', 'prenom', 'date_naissance', 'genre',
        'telephone', 'type_dent', 'cabinet', 'est_public', 'anonymise', 'date_creation'
    )
    list_filter = ('cabinet', 'type_dent', 'est_public', 'anonymise', 'genre')
    search_fields = ('nom', 'prenom', 'telephone', 'numero_securite_sociale')
    ordering = ('-date_creation',)
    readonly_fields = ('date_creation',)
    inlines = [OdontogrammeInline, RadiographieInline]

    fieldsets = (
        ('Identité', {
            'fields': ('cabinet', 'prenom', 'nom', 'date_naissance', 'genre', 'telephone')
        }),
        ('Informations médicales', {
            'fields': ('type_dent', 'allergies', 'antecedents', 'mutuelle', 'numero_securite_sociale')
        }),
        ('Paramètres', {
            'fields': ('est_public', 'anonymise', 'date_creation')
        }),
    )


# ═══════════════════════════════════════════════════════════════
#  ODONTOGRAMME
# ═══════════════════════════════════════════════════════════════

@admin.register(Odontogramme)
class OdontogrammeAdmin(admin.ModelAdmin):
    list_display = ('patient', 'get_cabinet', 'nombre_total_dents', 'date_derniere_mise_a_jour')
    search_fields = ('patient__nom', 'patient__prenom')
    readonly_fields = ('date_derniere_mise_a_jour', 'get_cabinet')
    inlines = [DentInline]

    def has_add_permission(self, request):
        return False  # créé uniquement par le signal

    def has_delete_permission(self, request, obj=None):
        return False  # supprimerait en cascade toutes les dents

    def get_cabinet(self, obj):
        return obj.cabinet
    get_cabinet.short_description = 'Cabinet'


# ═══════════════════════════════════════════════════════════════
#  DENT
# ═══════════════════════════════════════════════════════════════

@admin.register(Dent)
class DentAdmin(admin.ModelAdmin):
    list_display = (
        'numero', 'get_nom', 'get_quadrant',
        'get_type', 'get_statut_actuel_colore',
        'get_patient', 'get_cabinet'
    )
    list_filter = ('odontogramme__patient__cabinet', 'odontogramme__patient__type_dent')
    search_fields = ('odontogramme__patient__nom', 'odontogramme__patient__prenom', 'numero')
    readonly_fields = (
        'numero', 'get_nom', 'get_quadrant', 'get_label',
        'get_type', 'get_lettre', 'get_statut_actuel_colore'
    )
    # ✅ L'inline StatutDent permet d'ajouter/voir les statuts depuis la page d'une dent
    inlines = [StatutDentInline]

    fieldsets = (
        ('Dent', {
            'fields': ('numero', 'get_label', 'get_nom', 'get_quadrant', 'get_type', 'get_lettre')
        }),
        ('État actuel', {
            'fields': ('get_statut_actuel_colore',)
        }),
    )

    def has_add_permission(self, request):
        return False  # créées uniquement par le signal

    def has_delete_permission(self, request, obj=None):
        return False  # suppression via le signal uniquement (changement type_dent)

    def get_nom(self, obj):
        return obj.nom if obj.numero is not None else '—'
    get_nom.short_description = 'Nom'

    def get_quadrant(self, obj):
        return obj.nom_quadrant if obj.numero is not None else '—'
    get_quadrant.short_description = 'Quadrant'

    def get_label(self, obj):
        return obj.label if obj.numero is not None else '—'
    get_label.short_description = 'Label FDI'

    def get_type(self, obj):
        if obj.numero is None:
            return '—'
        return '🥛 Lait' if obj.est_lait else '🦷 Permanent'
    get_type.short_description = 'Type'

    def get_lettre(self, obj):
        if obj.numero is None:
            return '—'
        return obj.lettre_lait or '—'
    get_lettre.short_description = 'Lettre'

    def get_statut_actuel_colore(self, obj):
        if obj.numero is None:
            return '—'
        statut = obj.statut_actuel
        couleurs = {
            'sain':        '#2d7a4f',
            'carie':       '#c0392b',
            'plombe':      '#2563eb',
            'absente':     '#64748b',
            'couronne':    '#b8860b',
            'implant':     '#475569',
            'obturee':     '#2563eb',
            'fracturee':   '#9f1239',
            'devitalisee': '#dc6d1a',
            'bridge':      '#7c3aed',
        }
        couleur = couleurs.get(statut, '#333')
        return format_html(
            '<span style="color:{};font-weight:600">● {}</span>',
            couleur, statut.capitalize()
        )
    get_statut_actuel_colore.short_description = 'Statut actuel'

    def get_patient(self, obj):
        return obj.odontogramme.patient
    get_patient.short_description = 'Patient'

    def get_cabinet(self, obj):
        return obj.odontogramme.patient.cabinet
    get_cabinet.short_description = 'Cabinet'


# ═══════════════════════════════════════════════════════════════
#  STATUT DENT
# ═══════════════════════════════════════════════════════════════

@admin.register(StatutDent)
class StatutDentAdmin(admin.ModelAdmin):
    list_display = (
        'get_dent_label', 'get_patient', 'get_statut_colore',
        'modifie_par', 'consultation', 'date_enregistrement'
    )
    list_filter = ('statut', 'dent__odontogramme__patient__cabinet')
    search_fields = (
        'dent__odontogramme__patient__nom',
        'dent__odontogramme__patient__prenom',
        'dent__numero',
    )
    ordering = ('-date_enregistrement',)
    readonly_fields = ('date_enregistrement',)

    # ✅ On peut créer un StatutDent directement depuis cette vue aussi
    fields = ('dent', 'statut', 'modifie_par', 'consultation', 'date_enregistrement')

    def get_dent_label(self, obj):
        if obj.dent.numero is None:
            return f'Dent id={obj.dent.id}'
        return obj.dent.label
    get_dent_label.short_description = 'Dent'

    def get_patient(self, obj):
        return obj.dent.odontogramme.patient
    get_patient.short_description = 'Patient'

    def get_statut_colore(self, obj):
        couleurs = {
            'sain':        '#2d7a4f',
            'carie':       '#c0392b',
            'plombe':      '#2563eb',
            'absente':     '#64748b',
            'couronne':    '#b8860b',
            'implant':     '#475569',
            'obturee':     '#2563eb',
            'fracturee':   '#9f1239',
            'devitalisee': '#dc6d1a',
            'bridge':      '#7c3aed',
        }
        couleur = couleurs.get(obj.statut, '#333')
        return format_html(
            '<span style="color:{};font-weight:600">● {}</span>',
            couleur, obj.get_statut_display()
        )
    get_statut_colore.short_description = 'Statut'


# ═══════════════════════════════════════════════════════════════
#  RADIOGRAPHIE
# ═══════════════════════════════════════════════════════════════

@admin.register(Radiographie)
class RadiographieAdmin(admin.ModelAdmin):
    list_display = ('patient', 'get_cabinet', 'consultation', 'description', 'date')
    list_filter = ('patient__cabinet',)
    search_fields = ('patient__nom', 'patient__prenom', 'description')
    ordering = ('-date',)
    readonly_fields = ('date',)

    def get_cabinet(self, obj):
        return obj.patient.cabinet
    get_cabinet.short_description = 'Cabinet'