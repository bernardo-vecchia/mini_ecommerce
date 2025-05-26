export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[90vh]">
        <img
          src="/capibara-banner.png"
          alt="Capibara Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/50">
          <h1 className="text-5xl font-bold">Capibara Bombardina Store</h1>
          <p className="text-xl mt-4">
            Tecnologia, lifestyle e estilo com a cara da capivara.
          </p>
        </div>
      </section>
    </div>
  );
}
