from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend

from .models import User, Category, Product, Cart, CartItem
from .serializers import UserSerializer, CategorySerializer, ProductSerializer, CartSerializer, CartItemSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'stock']
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['name', 'price', 'stock']
    ordering = ['name']

    def get_queryset(self):
        queryset = Product.objects.select_related('category').all()
        
        # Filtro por categoria
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category__slug=category)
        
        # Filtro por preço mínimo e máximo
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        
        if min_price is not None:
            queryset = queryset.filter(price__gte=min_price)
        if max_price is not None:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filtro por disponibilidade em estoque
        in_stock = self.request.query_params.get('in_stock', None)
        if in_stock is not None and in_stock.lower() == 'true':
            queryset = queryset.filter(stock__gt=0)
        
        return queryset


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def my_cart(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_product(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({"error": "product_id é obrigatório"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Produto não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        cart, created = Cart.objects.get_or_create(user=request.user)
        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart, 
            product=product,
            defaults={'quantity': 0}
        )
        
        nova_quantidade = cart_item.quantity + quantity

        if product.stock < nova_quantidade:
            return Response({
                "error": "Estoque insuficiente",
                "available_stock": product.stock,
                "requested_quantity": nova_quantidade
            }, status=status.HTTP_400_BAD_REQUEST)

        cart_item.quantity = nova_quantidade
        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response({
            "message": "Produto adicionado ao carrinho",
            "item": serializer.data
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def remove_product(self, request):
        product_id = request.data.get('product_id')
        remove_all = request.data.get('remove_all', False)
        
        if not product_id:
            return Response({"error": "product_id é obrigatório"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Produto não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        cart, created = Cart.objects.get_or_create(user=request.user)

        try:
            cart_item = CartItem.objects.get(cart=cart, product=product)
            
            if remove_all or cart_item.quantity <= 1:
                cart_item.delete()
                return Response({"message": "Produto removido do carrinho"}, status=status.HTTP_200_OK)
            else:
                cart_item.quantity -= 1
                cart_item.save()
                serializer = CartItemSerializer(cart_item)
                return Response({
                    "message": "Quantidade atualizada no carrinho",
                    "item": serializer.data
                }, status=status.HTTP_200_OK)
                
        except CartItem.DoesNotExist:
            return Response({"error": "Produto não está no carrinho"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def clear_cart(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        cart.items.all().delete()
        return Response({"message": "Carrinho limpo com sucesso"}, status=status.HTTP_200_OK)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        
        # Validações básicas
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return Response({
                    "error": f"O campo {field} é obrigatório"
                }, status=status.HTTP_400_BAD_REQUEST)

        # Verificar se email já existe
        if User.objects.filter(email=data['email']).exists():
            return Response({
                "error": "Este email já está cadastrado"
            }, status=status.HTTP_400_BAD_REQUEST)

        # Verificar se username já existe
        if User.objects.filter(username=data['username']).exists():
            return Response({
                "error": "Este nome de usuário já está em uso"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', '')
            )
            
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)
            
            return Response({
                "message": "Usuário criado com sucesso",
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({
                "error": f"Erro ao criar usuário: {str(e)}"
            }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({
                "error": "Por favor, forneça email e senha"
            }, status=status.HTTP_400_BAD_REQUEST)

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({
                "error": "Nenhum usuário encontrado com este email"
            }, status=status.HTTP_404_NOT_FOUND)

        if not user.is_active:
            return Response({
                "error": "Esta conta está desativada"
            }, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)
            
            return Response({
                "message": "Login realizado com sucesso!",
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": "Senha incorreta"
            }, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Perfil atualizado com sucesso",
                "user": serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        return self.put(request)