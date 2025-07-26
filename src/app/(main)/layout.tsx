// src/app/(main)/layout.tsx

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-scree">
      <main className="flex-grow">{children}</main> {/* The page content goes here */}
    </div>
  );
}