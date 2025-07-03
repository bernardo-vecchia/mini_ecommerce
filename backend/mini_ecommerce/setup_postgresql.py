#!/usr/bin/env python3
"""
Script para configurar PostgreSQL para o projeto Capybara Store
"""

import os
import sys
import subprocess
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def run_command(command):
    """Executa um comando no shell"""
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar comando: {command}")
        print(f"Erro: {e.stderr}")
        return None

def create_database():
    """Cria o banco de dados PostgreSQL"""
    print("🐾 Configurando banco de dados PostgreSQL...")
    
    # Configurações do banco
    db_config = {
        'host': 'localhost',
        'port': '5432',
        'user': 'postgres',
        'password': 'postgres',  # Altere conforme necessário
        'database': 'capybara_store'
    }
    
    try:
        # Conectar ao PostgreSQL (banco postgres padrão)
        conn = psycopg2.connect(
            host=db_config['host'],
            port=db_config['port'],
            user=db_config['user'],
            password=db_config['password'],
            database='postgres'
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Verificar se o banco já existe
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_config['database'],))
        exists = cursor.fetchone()
        
        if not exists:
            # Criar o banco de dados
            cursor.execute(f"CREATE DATABASE {db_config['database']}")
            print(f"✅ Banco de dados '{db_config['database']}' criado com sucesso!")
        else:
            print(f"ℹ️  Banco de dados '{db_config['database']}' já existe.")
        
        cursor.close()
        conn.close()
        
        return True
        
    except psycopg2.Error as e:
        print(f"❌ Erro ao conectar com PostgreSQL: {e}")
        print("Verifique se:")
        print("1. PostgreSQL está instalado e rodando")
        print("2. As credenciais estão corretas")
        print("3. O usuário tem permissões para criar bancos")
        return False

def create_env_file():
    """Cria arquivo .env com as configurações"""
    env_content = """# Django Configuration
DJANGO_SECRET_KEY=django-insecure-capybara-secret-key-change-in-production
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DB_NAME=capybara_store
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
"""
    
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    
    if not os.path.exists(env_path):
        with open(env_path, 'w') as f:
            f.write(env_content)
        print("✅ Arquivo .env criado!")
    else:
        print("ℹ️  Arquivo .env já existe.")

def install_requirements():
    """Instala as dependências do projeto"""
    print("📦 Instalando dependências...")
    
    requirements_path = os.path.join(os.path.dirname(__file__), 'requirements.txt')
    
    if os.path.exists(requirements_path):
        result = run_command("pip install -r requirements.txt")
        if result is not None:
            print("✅ Dependências instaladas!")
        else:
            print("❌ Erro ao instalar dependências")
            return False
    else:
        print("❌ Arquivo requirements.txt não encontrado")
        return False
    
    return True

def run_migrations():
    """Executa as migrações do Django"""
    print("🔄 Executando migrações...")
    
    # Remover migrações antigas se existirem
    migrations_dir = os.path.join(os.path.dirname(__file__), 'api', 'migrations')
    if os.path.exists(migrations_dir):
        for file in os.listdir(migrations_dir):
            if file.endswith('.py') and file != '__init__.py':
                os.remove(os.path.join(migrations_dir, file))
        print("🗑️  Migrações antigas removidas")
    
    # Criar novas migrações
    result = run_command("python manage.py makemigrations")
    if result is None:
        print("❌ Erro ao criar migrações")
        return False
    
    # Aplicar migrações
    result = run_command("python manage.py migrate")
    if result is None:
        print("❌ Erro ao aplicar migrações")
        return False
    
    print("✅ Migrações executadas!")
    return True

def populate_database():
    """Popula o banco com dados de exemplo"""
    print("🌱 Populando banco de dados...")
    
    result = run_command("python manage.py populate_db")
    if result is not None:
        print("✅ Banco populado com dados de exemplo!")
        return True
    else:
        print("❌ Erro ao popular banco de dados")
        return False

def main():
    """Função principal"""
    print("🦫 Configurando Capybara Store Backend")
    print("=" * 50)
    
    # Verificar se estamos no diretório correto
    if not os.path.exists('manage.py'):
        print("❌ Execute este script no diretório do projeto Django")
        sys.exit(1)
    
    # Criar arquivo .env
    create_env_file()
    
    # Instalar dependências
    if not install_requirements():
        sys.exit(1)
    
    # Criar banco de dados
    if not create_database():
        print("❌ Falha na configuração do banco de dados")
        sys.exit(1)
    
    # Executar migrações
    if not run_migrations():
        sys.exit(1)
    
    # Popular banco de dados
    if not populate_database():
        print("⚠️  Aviso: Falha ao popular banco, mas você pode fazer isso manualmente")
    
    print("\n🎉 Configuração concluída!")
    print("\nPara iniciar o servidor:")
    print("python manage.py runserver")
    print("\nCredenciais do admin:")
    print("Email: admin@capybara.com")
    print("Senha: admin123")

if __name__ == "__main__":
    main()