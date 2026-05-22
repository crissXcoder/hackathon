"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, Router, Landmark, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-[1280px] mx-auto w-full space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-primary">Nuestros Servicios</h2>
        <p className="text-base text-slate-muted">
          Soluciones integrales diseñadas para mejorar la calidad de vida de nuestros asociados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Service Card 1 */}
        <div 
          ref={addToRefs}
          className="group bg-surface-container-lowest border border-border-hairline rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary-fixed-dim"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-on-surface mb-1">Distribución Eléctrica</h3>
              <p className="text-base text-slate-muted line-clamp-3">
                Suministro confiable de energía eléctrica para hogares y empresas, respaldado por fuentes 100% renovables.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border-hairline">
            <Link href="#" className="text-primary text-sm font-semibold flex items-center group-hover:text-primary-container transition-colors duration-300">
              Ver tarifas
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Service Card 2 */}
        <div 
          ref={addToRefs}
          className="group bg-surface-container-lowest border border-border-hairline rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary-fixed-dim relative overflow-hidden"
        >
          {/* Subtle accent gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
              <Router className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-on-surface mb-1">Telecomunicaciones</h3>
              <p className="text-base text-slate-muted line-clamp-3">
                Internet de fibra óptica de alta velocidad y televisión digital para mantener a Guanacaste conectado.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border-hairline relative z-10">
            <Link href="#" className="text-primary text-sm font-semibold flex items-center group-hover:text-primary-container transition-colors duration-300">
              Planes de Internet
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Service Card 3 */}
        <div 
          ref={addToRefs}
          className="group bg-surface-container-lowest border border-border-hairline rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary-fixed-dim"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-on-surface mb-1">Servicios Financieros</h3>
              <p className="text-base text-slate-muted line-clamp-3">
                Soluciones de crédito y ahorro diseñadas específicamente para las necesidades de nuestros asociados.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border-hairline">
            <Link href="#" className="text-primary text-sm font-semibold flex items-center group-hover:text-primary-container transition-colors duration-300">
              Opciones de crédito
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
