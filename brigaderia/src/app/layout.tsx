import Navbar from "@/components/navbar"; // Assumindo que 'components' está na raiz do projeto
import "./globals.css"; // Certifique-se de que o caminho está correto
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Brigaderia da Vanessa</title>
      </head>
      <body className="min-h-screen bg-[#96654A] text-white font-sans">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
