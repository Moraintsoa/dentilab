# facturation/admin.py

from django.contrib import admin
from .models import Facture, Paiement


# ===============================
# INLINE PAIEMENT
# ===============================

class PaiementInline(admin.TabularInline):
    model = Paiement
    extra = 0


# ===============================
# FACTURE ADMIN
# ===============================

@admin.register(Facture)
class FactureAdmin(admin.ModelAdmin):

    list_display = (
        "numero_facture",
        "cabinet",
        "patient",
        "consultation",
        "montant_total",
        "statut",
        "date_emission",
    )

    list_filter = (
        "cabinet",
        "statut",
        "date_emission",
    )

    search_fields = (
        "numero_facture",
        "patient__nom",
        "consultation__id",
    )

    autocomplete_fields = [
        "cabinet",
        "patient",
        "consultation",
        "creer_par",
    ]

    readonly_fields = (
        "montant_total",
        "date_emission",
    )

    inlines = [PaiementInline]


# ===============================
# PAIEMENT ADMIN
# ===============================

@admin.register(Paiement)
class PaiementAdmin(admin.ModelAdmin):

    list_display = (
        "facture",
        "montant",
        "methode",
        "date_paiement",
    )

    list_filter = (
        "methode",
        "date_paiement",
    )

    search_fields = (
        "facture__numero_facture",
    )

    autocomplete_fields = ["facture"]