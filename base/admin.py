from django.contrib import admin
from .models import *


admin.site.register(Product)
admin.site.register(Review)
admin.site.register(StoreReview)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
