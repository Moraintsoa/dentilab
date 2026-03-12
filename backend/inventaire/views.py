# inventaire/views.py
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Article, MouvementStock
from .serializers import ArticleSerializer, MouvementStockSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions import  AppartientAuCabinet

class ArticleViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    
class MouvementStockViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, AppartientAuCabinet]
    queryset = MouvementStock.objects.all()
    serializer_class = MouvementStockSerializer
