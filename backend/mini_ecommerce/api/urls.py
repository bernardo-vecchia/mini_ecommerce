from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    ProductViewSet,
    CategoryViewSet,
    CartViewSet,
    LoginView,
    RegisterView,
    UserProfileView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    # Rotas de Autenticação
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Perfil do usuário logado
    path('me/', UserProfileView.as_view(), name='me'),
    
    # Rotas do roteador (Products, Categories, Cart)
    *router.urls
]