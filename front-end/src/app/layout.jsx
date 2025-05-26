import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';

export const metadata = {
  title: 'Capibara Bombardina Store',
  description: 'Loja desenvolvida com Next.js + Django',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <CartProvider>
          <Navbar />
          <main className="mt-20 min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
