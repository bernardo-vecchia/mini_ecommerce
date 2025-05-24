export default function Home() {
  return (
    <section className="relative h-[90vh] mt-[80px]">
      {/* Imagem de fundo */}
      <img
        src="/capibara-banner.png"
        alt="Capibara Banner"
        className="w-1080 h-720 object-cover"
      />

      {/* Overlay para escurecer um pouco a imagem */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Texto centralizado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
          Capibara Bombardina Store
        </h1>
        <p className="text-lg md:text-2xl text-gray-200">
          Tecnologia, lifestyle e estilo com a cara da capivara.
        </p>
      </div>
    </section>
  );
}
