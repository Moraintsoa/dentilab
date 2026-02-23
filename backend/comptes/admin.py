from django.contrib import admin
from .models import CustomUser

# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'cabinet', 'est_dentiste', 'is_staff', 'is_active')
    search_fields = ('username', 'email')
