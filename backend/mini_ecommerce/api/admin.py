from django.contrib import admin
from .models import User, Category, Product, Cart, CartItem # Importar variáveis

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)