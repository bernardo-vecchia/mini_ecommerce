import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';
import { SearchProvider } from '../context/SearchContext';

export const metadata = {
  title: 'Capybara Bombardina Store',
  description: 'Loja desenvolvida com Next.js + Django',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <SearchProvider>
         <CartProvider>
            <Navbar />
            <main className="pt-[10px] min-h-[calc(100vh-60px-50px)]">
            {children}
            </main>
          <Footer />
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
