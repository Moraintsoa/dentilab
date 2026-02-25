
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('comptes.urls')),
    
    path('api/cabinet/', include('cabinet.urls')),
    path('api/comptes/', include('comptes.urls')),
    path('api/consultation/', include('consultation.urls')),
    path('api/inventaire/', include('inventaire.urls')),
    path('api/patient/', include('patients.urls')),
    path('api/rendezvous/', include('rendezvous.urls')),
    path('api/facturation/', include('facturation.urls')),
]
