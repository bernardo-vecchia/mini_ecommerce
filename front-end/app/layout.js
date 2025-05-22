export const metadata = {
  title: 'Mini Ecommerce',
  description: 'Venda de notebooks',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}