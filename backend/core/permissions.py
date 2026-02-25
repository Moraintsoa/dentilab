from rest_framework.permissions import BasePermission, IsAuthenticated, IsAdminUser

class EstAdmin(BasePermission):
    message = "Vous devez être un administrateur pour accéder à cette ressource."
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class EstDentiste(BasePermission):
    message = "Vous devez être un dentiste pour accéder à cette ressource."
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'dentiste'
    
class EstDentisteOuAssistant(BasePermission):
    message = "Vous devez être un dentiste ou un assistant pour accéder à cette ressource."
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['dentiste', 'assistant']
    
class EstAssistant(BasePermission):
    message = "Vous devez être un assistant pour accéder à cette ressource."
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.user.role == 'dentiste':
            return True
        if request.user.role == 'assistant':
            return request.method in ['GET', 'HEAD', 'OPTIONS']
    
class EstPatient(BasePermission):
    message = "Vous devez être un patient pour accéder à cette ressource."
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'patient'
    
class AppartientAuCabinet(BasePermission):
    message = "Vous n'avez pas accès à cette ressource car elle n'appartient pas à votre cabinet."
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'cabinet'):
            return obj.cabinet == request.user.cabinet
        elif hasattr(obj, 'patient'):
            return obj.patient.cabinet == request.user.cabinet
        elif hasattr(obj, 'odontogramme'):
            return obj.odontogramme.patient.cabinet == request.user.cabinet
        return False