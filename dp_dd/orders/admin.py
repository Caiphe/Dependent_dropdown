from django.contrib import admin
from .models import Order
from cars.models import Car
from models.models import Model

# Register your models here.
admin.site.register(Order)
admin.site.register(Car)
admin.site.register(Model)
