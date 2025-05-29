export default function Home() {
  return (
    <>
      <main className="bg-[black] min-h-screen text-white">

        {/* 🐾 Banner Principal */}
        <div className="relative w-full h-screen">
          <img
            src="/capibara-banner.png"
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold">Capybara Bombardina Store</h1>
            <p className="mt-4 text-xl">Tecnologia, lifestyle e estilo com a cara da capibara.</p>
          </div>
        </div>

        {/* ⭐ Destaques */}
        <section className="py-10 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Capybara Gamer', 'Notebook Gamer Capybara', 'Cadeira Gamer Capybara'].map((item) => (
              <div key={item} className="border rounded-lg p-4 shadow hover:shadow-xl transition">
                <img src="/capybara-banner.png" alt={item} className="rounded mb-4" />
                <h3 className="text-xl font-semibold">{item}</h3>
                <p className="text-gray-600">A partir de R$ 2.500,00</p>
                <button className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Ver Produto
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 🎯 Promoções */}
        <section className="bg-[black] py-10 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">Promoções</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Cadeira Escritório Capybara', 'Moletom Capybara', 'Fone Bluetooth Capybara'].map((item) => (
                <div key={item} className="border rounded-lg p-4 shadow hover:shadow-xl transition bg-white">
                  <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">20% OFF</span>
                  <img src="/capybara-banner.png" alt={item} className="rounded my-4" />
                  <h3 className="text-xl font-semibold">{item}</h3>
                  <p className="text-gray-600">De R$ 1.000,00 por R$ 800,00</p>
                  <button className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🏬 Lojas de Produtos */}
        <section className="py-10 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Nossas Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Computadores', desc: 'Linha gamer, workstation e estudo', link: '/product' },
              { name: 'Notebooks', desc: 'Desempenho e mobilidade', link: '/product' },
              { name: 'Cadeiras', desc: 'Conforto gamer e escritório', link: '/product' },
              { name: 'Vestuário', desc: 'Estilo com a cara da Capybara', link: '/product' },
            ].map((cat) => (
              <div key={cat.name} className="border rounded-lg p-4 shadow hover:shadow-xl transition">
                <img src="/capybara-banner.png" alt={cat.name} className="rounded mb-4" />
                <h3 className="text-xl font-semibold">{cat.name}</h3>
                <p className="text-gray-600">{cat.desc}</p>

                <button className="mt-3 bg-white text-black px-4 py-2 rounded hover:bg-gray-800">
                  Ver {cat.name}
                </button>

              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
