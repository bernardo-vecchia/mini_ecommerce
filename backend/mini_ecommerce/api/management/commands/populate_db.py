from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Category, Product
from decimal import Decimal

User = get_user_model()

class Command(BaseCommand):
    help = 'Popula o banco de dados com dados de exemplo'

    def handle(self, *args, **options):
        self.stdout.write('Iniciando população do banco de dados...')

        # Criar superusuário se não existir
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@capybara.com',
                password='admin123',
                first_name='Admin',
                last_name='Capybara'
            )
            self.stdout.write(self.style.SUCCESS('Superusuário criado: admin@capybara.com / admin123'))

        # Criar categorias
        categorias_data = [
            {'name': 'Computadores', 'slug': 'computadores'},
            {'name': 'Notebooks', 'slug': 'notebooks'},
            {'name': 'Periféricos', 'slug': 'perifericos'},
            {'name': 'Cadeiras', 'slug': 'cadeiras'},
            {'name': 'Acessórios', 'slug': 'acessorios'},
            {'name': 'Vestuário', 'slug': 'vestuario'},
        ]

        categorias = {}
        for cat_data in categorias_data:
            categoria, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name']}
            )
            categorias[cat_data['slug']] = categoria
            if created:
                self.stdout.write(f'Categoria criada: {categoria.name}')

        # Criar produtos
        produtos_data = [
            # Computadores
            {
                'name': 'Computador Gamer Capybara RTX 4080',
                'description': 'PC Gamer completo com RTX 4080, ideal para jogos em 4K e streaming. Processador Intel i7, 32GB RAM, SSD 1TB.',
                'price': Decimal('8999.99'),
                'stock': 15,
                'category': categorias['computadores']
            },
            {
                'name': 'Computador Estudante Capybara',
                'description': 'PC ideal para estudos e trabalho. Processador Intel i5, 16GB RAM, SSD 512GB. Perfeito para produtividade.',
                'price': Decimal('2999.99'),
                'stock': 25,
                'category': categorias['computadores']
            },
            {
                'name': 'Computador Workstation Capybara Pro',
                'description': 'Estação de trabalho profissional para design e engenharia. Xeon, 64GB RAM, RTX A4000.',
                'price': Decimal('15999.99'),
                'stock': 8,
                'category': categorias['computadores']
            },

            # Notebooks
            {
                'name': 'Notebook Gamer Capybara Legion',
                'description': 'Notebook gamer portátil com RTX 4060, tela 144Hz, ideal para jogos em movimento.',
                'price': Decimal('6499.99'),
                'stock': 12,
                'category': categorias['notebooks']
            },
            {
                'name': 'Notebook Estudante Capybara Slim',
                'description': 'Ultrabook leve e elegante para estudantes. 14 polegadas, 8GB RAM, SSD 256GB.',
                'price': Decimal('2199.99'),
                'stock': 30,
                'category': categorias['notebooks']
            },

            # Periféricos
            {
                'name': 'Teclado Mecânico Capybara RGB',
                'description': 'Teclado mecânico com switches Cherry MX, iluminação RGB personalizável.',
                'price': Decimal('299.99'),
                'stock': 50,
                'category': categorias['perifericos']
            },
            {
                'name': 'Mouse Gamer Capybara Pro',
                'description': 'Mouse gamer de alta precisão, 16000 DPI, 7 botões programáveis.',
                'price': Decimal('199.99'),
                'stock': 40,
                'category': categorias['perifericos']
            },
            {
                'name': 'Headset Gamer Capybara 7.1',
                'description': 'Headset com som surround 7.1, microfone removível, conforto premium.',
                'price': Decimal('399.99'),
                'stock': 35,
                'category': categorias['perifericos']
            },

            # Cadeiras
            {
                'name': 'Cadeira Gamer Capybara Racing',
                'description': 'Cadeira gamer ergonômica com apoio lombar, reclinável até 180°.',
                'price': Decimal('1299.99'),
                'stock': 20,
                'category': categorias['cadeiras']
            },
            {
                'name': 'Cadeira Escritório Capybara Executive',
                'description': 'Cadeira executiva em couro sintético, design elegante e confortável.',
                'price': Decimal('899.99'),
                'stock': 18,
                'category': categorias['cadeiras']
            },

            # Acessórios
            {
                'name': 'Capa Notebook Capybara 15"',
                'description': 'Capa protetora acolchoada para notebooks de 15 polegadas.',
                'price': Decimal('79.99'),
                'stock': 60,
                'category': categorias['acessorios']
            },
            {
                'name': 'Carregador Universal Capybara 65W',
                'description': 'Carregador USB-C universal 65W, compatível com diversos dispositivos.',
                'price': Decimal('149.99'),
                'stock': 45,
                'category': categorias['acessorios']
            },

            # Vestuário
            {
                'name': 'Moletom Capybara Gamer',
                'description': 'Moletom confortável com estampa exclusiva da Capybara, 100% algodão.',
                'price': Decimal('129.99'),
                'stock': 100,
                'category': categorias['vestuario']
            },
        ]

        for produto_data in produtos_data:
            produto, created = Product.objects.get_or_create(
                name=produto_data['name'],
                defaults=produto_data
            )
            if created:
                self.stdout.write(f'Produto criado: {produto.name}')

        self.stdout.write(
            self.style.SUCCESS(
                f'População concluída! '
                f'Categorias: {Category.objects.count()}, '
                f'Produtos: {Product.objects.count()}'
            )
        )