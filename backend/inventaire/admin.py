from django.contrib import admin
from .models import Article, MouvementStock

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('nom', 'quantite_actuelle', 'seuil_alerte', 'cabinet')
    list_filter = ('cabinet',)

@admin.register(MouvementStock)
class MouvementAdmin(admin.ModelAdmin):
    list_display = ('article', 'type', 'quantite', 'date')