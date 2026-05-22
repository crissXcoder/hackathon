"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Wifi } from "lucide-react";
import gsap from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Title animation
      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        // Paragraph animation
        .fromTo(
          pRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        // Actions animation
        .fromTo(
          actionsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        // Bento widget animation
        .fromTo(
          bentoRef.current,
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-primary-container text-on-primary flex items-center min-h-[614px] py-16 px-6"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Hero Background"
          src="https://images.unsplash.com/photo-1542382020-f472f8832a76?q=80&w=2000&auto=format&fit=crop"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-20">
        <div className="space-y-6">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight opacity-0"
          >
            Energía y Conectividad para el Futuro
          </h1>
          <p 
            ref={pRef}
            className="text-lg text-on-primary/90 max-w-xl opacity-0"
          >
            Impulsando el desarrollo sostenible de Guanacaste con servicios confiables, innovación tecnológica y compromiso cooperativo.
          </p>
          <div 
            ref={actionsRef}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2 opacity-0"
          >
            <Link
              href="/devices"
              className="bg-secondary text-on-surface text-sm font-semibold px-6 py-4 rounded-lg hover:scale-95 transition-transform duration-300 ease-in-out shadow-sm hover:shadow-md text-center inline-flex justify-center items-center"
            >
              Ir a Dashboard NOC
            </Link>
            <Link
              href="#"
              className="border-2 border-on-primary/30 bg-white/5 backdrop-blur-sm text-on-primary text-sm font-semibold px-6 py-4 rounded-lg hover:bg-white/10 hover:scale-95 transition-all duration-300 ease-in-out text-center inline-flex justify-center items-center"
            >
              Conocer Más
            </Link>
          </div>
        </div>

        {/* Quick Telemetry/Info Widget (Bento style) */}
        <div 
          ref={bentoRef}
          className="hidden lg:grid grid-cols-2 gap-4 p-6 bg-surface-glass backdrop-blur-md rounded-xl border border-white/20 shadow-lg transform translate-y-[-10px] opacity-0"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-1 text-primary">
              <Zap className="w-5 h-5 fill-current" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-muted">Energía Renovable</span>
            </div>
            <p className="text-2xl font-bold text-on-surface">100%</p>
            <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-1 text-primary">
              <Wifi className="w-5 h-5 fill-current" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-muted">Cobertura Fibra</span>
            </div>
            <p className="text-2xl font-bold text-on-surface">95K+</p>
            <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[85%] animate-pulse" style={{ animationDelay: '200ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
