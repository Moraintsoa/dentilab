# inventaire/serializers.py
from rest_framework import serializers
from .models import Article, MouvementStock

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        
class MouvementStockSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True)
    
    class Meta:
        model = MouvementStock
        fields = '__all__'