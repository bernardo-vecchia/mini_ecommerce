# Capybara Store Backend

Backend da loja Capybara Store desenvolvido com Django REST Framework e PostgreSQL.

## 🚀 Configuração Rápida

### Pré-requisitos
- Python 3.8+
- PostgreSQL 12+
- pip

### Instalação Automática

1. **Clone o repositório e navegue até o diretório do backend:**
```bash
cd backend/mini_ecommerce
```

2. **Execute o script de configuração:**
```bash
python setup_postgresql.py
```

Este script irá:
- Criar o arquivo `.env` com as configurações
- Instalar todas as dependências
- Criar o banco de dados PostgreSQL
- Executar as migrações
- Popular o banco com dados de exemplo

### Instalação Manual

1. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

2. **Configure o PostgreSQL:**
```bash
# Acesse o PostgreSQL
sudo -u postgres psql

# Crie o banco de dados
CREATE DATABASE capybara_store;

# Crie um usuário (opcional)
CREATE USER capybara_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE capybara_store TO capybara_user;
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Execute as migrações:**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Crie um superusuário:**
```bash
python manage.py createsuperuser
```

6. **Popular com dados de exemplo (opcional):**
```bash
python manage.py populate_db
```

## 🏃‍♂️ Executando o Servidor

```bash
python manage.py runserver
```

O servidor estará disponível em: `http://localhost:8000`

## 📚 API Endpoints

### Autenticação
- `POST /api/auth/register/` - Registro de usuário
- `POST /api/auth/login/` - Login
- `POST /api/auth/token/` - Obter token JWT
- `POST /api/auth/token/refresh/` - Renovar token
- `GET /api/me/` - Perfil do usuário logado

### Produtos
- `GET /api/products/` - Listar produtos
- `GET /api/products/{id}/` - Detalhes do produto
- `GET /api/products/?search=termo` - Buscar produtos
- `GET /api/products/?category=slug` - Filtrar por categoria

### Categorias
- `GET /api/categories/` - Listar categorias
- `GET /api/categories/{slug}/` - Detalhes da categoria

### Carrinho (Requer autenticação)
- `GET /api/cart/my_cart/` - Meu carrinho
- `POST /api/cart/add_product/` - Adicionar produto
- `POST /api/cart/remove_product/` - Remover produto
- `POST /api/cart/clear_cart/` - Limpar carrinho

## 🛠️ Configurações

### Variáveis de Ambiente (.env)
```env
DJANGO_SECRET_KEY=sua-chave-secreta
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=capybara_store
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
```

### Configurações de CORS
O backend está configurado para aceitar requisições do frontend Next.js:
- `http://localhost:3000`
- `http://localhost:3001`

## 🗄️ Modelos de Dados

### User (Usuário)
- Email único como username
- Campos: username, email, first_name, last_name

### Category (Categoria)
- Nome e slug únicos
- Relacionamento com produtos

### Product (Produto)
- Nome, descrição, preço, estoque
- Imagem (upload)
- Categoria (FK)

### Cart (Carrinho)
- Usuário (FK)
- Data de criação
- Produtos através de CartItem

### CartItem (Item do Carrinho)
- Carrinho (FK)
- Produto (FK)
- Quantidade

## 🔧 Comandos Úteis

```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Popular banco com dados de exemplo
python manage.py populate_db

# Coletar arquivos estáticos
python manage.py collectstatic

# Shell do Django
python manage.py shell

# Executar testes
python manage.py test
```

## 📦 Dependências Principais

- Django 5.2.1
- Django REST Framework 3.15.2
- PostgreSQL (psycopg2-binary)
- JWT Authentication
- CORS Headers
- Pillow (para imagens)

## 🐛 Troubleshooting

### Erro de conexão com PostgreSQL
1. Verifique se o PostgreSQL está rodando
2. Confirme as credenciais no arquivo `.env`
3. Teste a conexão: `psql -h localhost -U postgres -d capybara_store`

### Erro de migrações
1. Remova arquivos de migração: `rm api/migrations/0*.py`
2. Recrie as migrações: `python manage.py makemigrations`
3. Aplique: `python manage.py migrate`

### Problemas com CORS
1. Verifique se `corsheaders` está instalado
2. Confirme a configuração em `settings.py`
3. Adicione o domínio do frontend em `CORS_ALLOWED_ORIGINS`

## 📝 Logs

Os logs são salvos em `debug.log` no diretório raiz do projeto.

## 🔒 Segurança

- JWT tokens com expiração configurável
- Senhas hasheadas com Django
- CORS configurado para domínios específicos
- Validação de dados de entrada
- Rate limiting (pode ser adicionado)

## 🚀 Deploy

Para deploy em produção:

1. Configure `DEBUG=False`
2. Use uma chave secreta forte
3. Configure banco de dados de produção
4. Configure servidor web (nginx/apache)
5. Use HTTPS
6. Configure backup do banco de dados