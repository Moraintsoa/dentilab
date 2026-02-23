from django.contrib import admin
from .models import Cabinet

@admin.register(Cabinet)
class CabinetAdmin(admin.ModelAdmin):
    list_display = ('nom', 'adresse', 'telephone')
    search_fields = ('nom', 'adresse', 'telephone')