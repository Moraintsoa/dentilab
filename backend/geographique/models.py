from django.db import models

# Create your models here.
class Pays(models.Model):
    nom = models.CharField(max_length=255)
    code_pays = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.nom
    
class Province(models.Model):
    nom = models.CharField(max_length=255)
    pays = models.ForeignKey(Pays, on_delete=models.CASCADE, related_name='provinces')

    def __str__(self):
        return self.nom

class Region(models.Model):
    nom = models.CharField(max_length=255)
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='regions')

    def __str__(self):
        return self.nom

class District(models.Model):
    nom = models.CharField(max_length=255)
    code_postal = models.CharField(max_length=10, null=True, blank=True)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name='districts')

    def __str__(self):
        return self.nom
    
class Commune(models.Model):
    nom = models.CharField(max_length=255)
    district = models.ForeignKey(District, on_delete=models.CASCADE, related_name='communes')

    def __str__(self):
        return self.nom

class Quartier(models.Model):
    nom = models.CharField(max_length=255)
    commune = models.ForeignKey(Commune, on_delete=models.CASCADE, related_name='quartiers')

    def __str__(self):
        return self.nom