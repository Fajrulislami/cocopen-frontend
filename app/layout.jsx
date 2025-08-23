'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/navbar2';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek status login dari localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [pathname]); // Update saat halaman berubah

  // Daftar halaman yang tidak menampilkan navbar
  const hideNavbarRoutes = [
    '/login',
    '/registrasi',
    '/register',
    '/forgot-password',
    '/verify',
    '/reset-password',
  ];

  // Cek apakah halaman adalah bagian dari dashboard
  const isDashboard = pathname.startsWith('/dashboard');

  // Tentukan navbar mana yang akan ditampilkan (jika tidak di-hide)
  const NavbarComponent = isLoggedIn ? Navbar : Navbar2;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Tampilkan Navbar hanya jika: bukan dashboard DAN bukan halaman login/register */}
        {!isDashboard && !hideNavbarRoutes.includes(pathname) && (
          <NavbarComponent />
        )}

        {/* Main Content */}
        <main key={pathname}>{children}</main>
      </body>
    </html>
  );
}