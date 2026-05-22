"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, HelpCircle, User, Menu } from "lucide-react";
import gsap from "gsap";

export function LandingHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Simple fade in from top
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={headerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-white/10 ${
        scrolled ? "bg-nav-glass backdrop-blur-md shadow-md" : "bg-transparent shadow-none"
      }`}
    >
      <div className="flex justify-between items-center w-full px-6 max-w-[1440px] mx-auto h-20">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-on-primary hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Coopeguanacaste RL
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center h-full">
          <Link
            href="/"
            className="text-secondary-fixed font-bold border-b-2 border-secondary-fixed pb-1 hover:scale-105 duration-300 ease-in-out text-sm flex items-center h-full"
          >
            Servicios
          </Link>
          <Link
            href="#"
            className="text-on-primary/90 font-medium hover:text-on-primary transition-colors hover:scale-105 duration-300 ease-in-out text-sm flex items-center h-full"
          >
            Facturación
          </Link>
          <Link
            href="#"
            className="text-on-primary/90 font-medium hover:text-on-primary transition-colors hover:scale-105 duration-300 ease-in-out text-sm flex items-center h-full"
          >
            Sostenibilidad
          </Link>
          <Link
            href="#"
            className="text-on-primary/90 font-medium hover:text-on-primary transition-colors hover:scale-105 duration-300 ease-in-out text-sm flex items-center h-full"
          >
            Transparencia
          </Link>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            aria-label="Search"
            className="hidden md:flex text-on-primary/90 hover:text-on-primary hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {/* Icon Actions */}
          <button
            aria-label="Help"
            className="text-on-primary/90 hover:text-on-primary hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            aria-label="Account"
            className="text-on-primary/90 hover:text-on-primary hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <User className="w-5 h-5" />
          </button>
          
          {/* Primary Action */}
          <Link
            href="/devices"
            className="hidden md:inline-flex bg-secondary-fixed text-on-surface text-sm font-semibold px-4 py-2 rounded hover:scale-95 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
          >
            NOC Dashboard
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-on-primary hover:scale-105 transition-transform duration-300 ease-in-out">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
