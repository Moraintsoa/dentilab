from django.contrib import admin
from .models import CustomUser

# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('nom_cabinet','id', 'email', 'is_staff', 'is_active','role')
    search_fields = ('nom_cabinet', 'email')
