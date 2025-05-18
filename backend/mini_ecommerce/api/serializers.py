from rest_framework import serializers
from .models import User, Category, Product, CartItem, Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User # Modelo que ele representa
        fields = ['id', 'username', 'email', 'first_name', 'last_name'] # Campos que serão exibidos na API

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug'] # Nome e slug da categoria

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True) # Nome e slug da categoria
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'image', 'category']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) # Serial dentro do produto

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity'] # Exibe o produto e a quantidade

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True) # Serial dos itens

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at'] # Itens e data
