import '../src/app/globals.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export const metadata = {
  title: 'Capibara Bombardina Store',
  description: 'Loja desenvolvida com Next.js + Django',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Navbar />
        <main className="mt-[90px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}