"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const userMenuRef = useRef(null);
	const userButtonRef = useRef(null);
	const router = useRouter();

	// Cek login status saat komponen mount
	useEffect(() => {
		const token = localStorage.getItem("auth_token");
		setIsLoggedIn(!!token);

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Tutup dropdown saat klik di luar
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				userMenuRef.current &&
				userButtonRef.current &&
				!userMenuRef.current.contains(event.target) &&
				!userButtonRef.current.contains(event.target)
			) {
				setUserMenuOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	// Toggle mobile menu
	const toggleMobileMenu = () => {
		setMobileMenuOpen((prev) => !prev);
	};

	// Toggle user menu
	const toggleUserMenu = () => {
		if (!isLoggedIn) {
			router.push("/login");
			return;
		}
		setUserMenuOpen((prev) => !prev);
	};

	// Handle logout
	const handleLogout = () => {
		localStorage.removeItem("auth_token");
		setIsLoggedIn(false);
		setUserMenuOpen(false);
		router.push("/"); // Redirect ke home
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-white/5 backdrop-blur-lg shadow-lg py-2"
					: "bg-white/5 backdrop-blur-lg shadow-lg py-4"
			}`}>
			{/* Container Navbar */}
			<div className="w-screen pr-10 pl-6 md:px-16">
				<div className="relative flex h-9 items-center justify-between">
					{/* Logo */}
					<div className="flex flex-1 items-center justify-between sm:justify-between">
						<Link href="/" className="flex items-center md:w-25">
							<Image
								src="/logo.png"
								alt="Coconut Logo"
								width={40}
								height={40}
								className="h-10 w-auto"
							/>
						</Link>

						{/* Mobile Menu Button */}
						<div className="relative inset-y-0 left-0 flex items-center sm:hidden">
							<button
								type="button"
								onClick={toggleMobileMenu}
								className="relative inline-flex items-center justify-end rounded-md p-2 text-gray-900 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-black"
								aria-expanded={mobileMenuOpen}>
								<span className="sr-only">Open main menu</span>
								{/* Hamburger Icon */}
								<svg
									className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
								{/* Close Icon */}
								<svg
									className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* Desktop Menu */}
						<div className="hidden sm:block">
							<div className="flex justify-center">
								<div className="flex space-x-6 text-center">
									{[
										{ href: "/", label: "BERANDA" },
										{ href: "/about", label: "TENTANG" },
										{ href: "/activity", label: "AKTIVITAS" },
										{ href: "/contact", label: "KONTAK" },
									].map((item) => (
										<Link
											key={item.href}
											href={item.href}
											className="relative inline-block px-5 py-2 text-gray-800 font-medium rounded-lg transition-all duration-300 transform hover:scale-110 group">
											{item.label}
											<span className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></span>
											<span className="absolute inset-0 flex items-center justify-center text-gray-800 group-hover:text-white transition-colors duration-300 pointer-events-none">
												{item.label}
											</span>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Right Side: Auth or Profile */}
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-3">
						{/* Notification Button (hanya muncul jika login) */}
						{isLoggedIn && (
							<button
								type="button"
								className="relative rounded-full p-1.5 text-gray-900 hover:bg-white/30 focus:outline-none focus:ring-2 md:block hidden focus:ring-indigo-500 transition"
								aria-label="View notifications">
								<span className="absolute -inset-1.5"></span>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									className="w-6 h-6">
									<path
										d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						)}

						{/* Conditional: Login/Register vs Profile */}
						{isLoggedIn ? (
							// 🔐 Sudah login → tampilkan profile
							<div
								className="md:relative md:ml-1 md:block hidden"
								ref={userMenuRef}>
								<Link href="/dashboard">
									<button
										type="button"
										ref={userButtonRef}
										className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
										onClick={toggleUserMenu}>
										<img
											className="h-10 w-10 rounded-full"
											src="/slider/saudahlatarbiru.png"
											alt="User profile"
										/>
									</button>
								</Link>

								{/* User Dropdown */}
								{userMenuOpen && (
									<div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
										<div className="py-1">
											<Link
												href="/dashboard"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={() => setUserMenuOpen(false)}>
												Profil Saya
											</Link>
											<button
												onClick={handleLogout}
												className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
												Keluar
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							// 🚪 Belum login → tampilkan tombol Masuk & Daftar
							<div className="flex items-center space-x-3">
								<Link
									href="/login"
									className="text-sm font-medium text-gray-800 hover:text-sky-700 transition">
									Masuk
								</Link>
								<Link
									href="/registrasi"
									className="hidden md:block bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-sky-600 hover:to-blue-700 transition-all shadow">
									Daftar
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div className={`${mobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
				<div className="space-y-1 px-4 pb-3 pt-2">
					{isLoggedIn ? (
						<>
							<Link
								href="/dashboard"
								className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black/5 hover:text-gray-600"
								onClick={() => setMobileMenuOpen(false)}>
								Profil
							</Link>
							<button
								onClick={handleLogout}
								className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black/5 hover:text-gray-600">
								Keluar
							</button>
						</>
					) : (
						<>
							<Link
								href="/login"
								className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black/5 hover:text-gray-600"
								onClick={() => setMobileMenuOpen(false)}>
								Masuk
							</Link>
							<Link
								href="/registrasi"
								className="block rounded-md bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3 py-2 text-base font-medium hover:from-sky-600 hover:to-blue-700"
								onClick={() => setMobileMenuOpen(false)}>
								Daftar
							</Link>
						</>
					)}
					<Link
						href="/"
						className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black/5 hover:text-gray-600"
						onClick={() => setMobileMenuOpen(false)}>
						Beranda
					</Link>
					<Link
						href="/about"
						className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black/5 hover:text-gray-600"
						onClick={() => setMobileMenuOpen(false)}>
						Tentang
					</Link>
					<Link
						href="/activity"
						className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black/5 hover:text-gray-600"
						onClick={() => setMobileMenuOpen(false)}>
						Aktivitas
					</Link>
					<Link
						href="/contact"
						className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black/5 hover:text-gray-600"
						onClick={() => setMobileMenuOpen(false)}>
						Kontak
					</Link>
				</div>
			</div>
		</nav>
	);
}
