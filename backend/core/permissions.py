from rest_framework.permissions import BasePermission, IsAuthenticated, IsAdminUser


class EstAdmin(BasePermission):
    message = "Vous devez être un administrateur pour accéder à cette ressource."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "ADMIN"


class EstDentiste(BasePermission):
    message = "Vous devez être un dentiste pour accéder à cette ressource."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "CABINET"


class EstPatient(BasePermission):
    message = "Vous devez être un patient pour accéder à cette ressource."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "PATIENT"


from rest_framework.permissions import BasePermission


class AppartientAuCabinet(BasePermission):
    message = "Cette ressource n'appartient pas à votre cabinet."

    def has_object_permission(self, request, view, obj):

        if not request.user.is_authenticated or request.user.role != "CABINET":
            return False

        cabinet = None

        if hasattr(obj, "cabinet"):
            cabinet = obj.cabinet

        elif hasattr(obj, "patient"):
            cabinet = obj.patient.cabinet

        elif hasattr(obj, "odontogramme"):
            cabinet = obj.odontogramme.patient.cabinet

        elif hasattr(obj, "dent"):
            cabinet = obj.dent.odontogramme.patient.cabinet

        return cabinet == request.user
