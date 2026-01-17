import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Life Dashboard',
  description: 'Interactive spotlight dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 min-h-screen">{children}</body>
    </html>
  );
}
