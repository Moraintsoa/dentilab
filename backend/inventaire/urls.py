# inventaire/urls.py
from django.urls import path, include
from .views import ArticleViewSet, MouvementStockViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'mouvements-stock', MouvementStockViewSet, basename='mouvement-stock')

urlpatterns = [
    path('', include(router.urls)),
]

