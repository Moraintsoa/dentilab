from django.contrib import admin
from .models import RendezVous

@admin.register(RendezVous)
class RendezVousAdmin(admin.ModelAdmin):
    list_display = ('patient', 'debut', 'cabinet', 'statut')
    list_filter = ('cabinet', 'statut')
    search_fields = ('patient__nom',)