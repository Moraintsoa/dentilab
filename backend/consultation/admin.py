# consultation/admin.py

from django.contrib import admin
from .models import Consultation, Traitement, TypeTraitement


# ===============================
# INLINE TRAITEMENT
# ===============================

class TraitementInline(admin.TabularInline):
    model = Traitement
    extra = 0
    autocomplete_fields = ["dent", "type_traitement"]


# ===============================
# CONSULTATION ADMIN
# ===============================

@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "cabinet",
        "odontogramme",
        "statut",
        "appliquer_frais",
        "total_display",
        "date_creation",
    )

    list_filter = (
        "cabinet",
        "statut",
        "appliquer_frais",
        "date_creation",
    )

    search_fields = (
        "odontogramme__patient__nom",
    )

    autocomplete_fields = [
        "cabinet",
        "odontogramme",
        "rendezvous",
    ]

    inlines = [TraitementInline]

    readonly_fields = ("total_display", "date_creation")

    def total_display(self, obj):
        return obj.total

    total_display.short_description = "Total"


# ===============================
# TYPE TRAITEMENT ADMIN
# ===============================

@admin.register(TypeTraitement)
class TypeTraitementAdmin(admin.ModelAdmin):

    list_display = (
        "nom",
        "categorie",
        "cout",
        "est_actif",
    )

    list_filter = ("categorie", "est_actif")

    search_fields = ("nom",)


# ===============================
# TRAITEMENT ADMIN
# ===============================

@admin.register(Traitement)
class TraitementAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "consultation",
        "dent",
        "type_traitement",
        "statut",
        "cout",
        "date",
    )

    list_filter = (
        "statut",
        "type_traitement",
    )

    autocomplete_fields = [
        "consultation",
        "dent",
        "type_traitement",
    ]

    search_fields = (
        "consultation__id",
        "dent__numero",
    )


# # consultation/admin.py

# from django.contrib import admin
# from .models import (
#     Acte,
#     Consultation,
#     Traitement,
#     TypeTraitement,
# )


# # ===============================
# # INLINE TRAITEMENT
# # ===============================

# class TraitementInline(admin.TabularInline):
#     model = Traitement
#     extra = 0
#     autocomplete_fields = ["dent", "type_traitement"]


# # ===============================
# # CONSULTATION INLINE
# # ===============================

# class ConsultationInline(admin.StackedInline):
#     model = Consultation
#     extra = 0
#     can_delete = False


# # ===============================
# # ACTE ADMIN
# # ===============================

# @admin.register(Acte)
# class ActeAdmin(admin.ModelAdmin):

#     list_display = (
#         "id",
#         "cabinet",
#         "odontogramme",
#         "effectue_par",
#         "statut",
#         "appliquer_cout_consultation",
#         "cout_total_display",
#         "date_creation",
#     )

#     list_filter = (
#         "cabinet",
#         "statut",
#         "appliquer_cout_consultation",
#         "date_creation",
#     )

#     search_fields = (
#         "odontogramme__patient__nom",
#         "effectue_par__email",
#     )

#     autocomplete_fields = [
#         "cabinet",
#         "odontogramme",
#         "effectue_par",
#         "rendezvous",
#     ]

#     inlines = [ConsultationInline, TraitementInline]

#     readonly_fields = ("cout_total_display", "date_creation")

#     def cout_total_display(self, obj):
#         return obj.cout_total

#     cout_total_display.short_description = "Total Acte"


# # ===============================
# # TRAITEMENT ADMIN
# # ===============================

# @admin.register(Traitement)
# class TraitementAdmin(admin.ModelAdmin):

#     list_display = (
#         "id",
#         "acte",
#         "dent",
#         "type_traitement",
#         "statut",
#         "cout",
#         "date",
#     )

#     list_filter = (
#         "statut",
#         "type_traitement",
#     )

#     autocomplete_fields = [
#         "acte",
#         "dent",
#         "type_traitement",
#     ]

#     search_fields = (
#         "acte__id",
#         "dent__numero",
#     )


# # ===============================
# # TYPE TRAITEMENT ADMIN
# # ===============================

# @admin.register(TypeTraitement)
# class TypeTraitementAdmin(admin.ModelAdmin):

#     list_display = (
#         "nom",
#         "cout",
#     )

#     search_fields = ("nom",)


# # ===============================
# # CONSULTATION ADMIN
# # ===============================

# @admin.register(Consultation)
# class ConsultationAdmin(admin.ModelAdmin):

#     list_display = (
#         "id",
#         "acte",
#         "motif",
#         "cout",
#         "date",
#     )

#     autocomplete_fields = ["acte"]

#     search_fields = (
#         "acte__id",
#         "motif",
#     )