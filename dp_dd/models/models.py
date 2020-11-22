from django.db import models
from cars.models import Car

class Model(models.Model):
    name = models.CharField(max_length=100)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.car}-{self.name}'

