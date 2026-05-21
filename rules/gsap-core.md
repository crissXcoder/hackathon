---
trigger: model_decision
description: Activar al implementar animaciones con GSAP, tweens, timelines o cuando el usuario pide dar vida a una página
---

<RULE id="workspace_gsap_core_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.

El objetivo es crear interfaces:

- fluidas
- modernas
- vivas
- cinematográficas

SIN sacrificar:

- SSR
- SEO
- performance
- accesibilidad
- arquitectura App Router
- progressive enhancement

GSAP es una capa de enriquecimiento visual,
NO la arquitectura principal de la aplicación.
</core_enforcement>

<!-- ── SELF CHECK ── -->

<self_check>
Antes de implementar cualquier animación:

1. ¿La UI sigue funcionando si JavaScript falla?
2. ¿El contenido SSR sigue visible antes de hydration?
3. ¿Estoy animando transforms y NO layout properties?
4. ¿Estoy aislando la animación en un Client Wrapper pequeño?
5. ¿Estoy evitando convertir páginas completas en Client Components?
6. ¿La animación aporta valor real o solo ruido visual?
7. ¿Estoy respetando prefers-reduced-motion?
8. ¿La animación afecta LCP, CLS o hydration?
9. ¿Estoy usando timeline() correctamente en secuencias?
10. ¿Estoy evitando sobrehidratación innecesaria?
    </self_check>

<!-- ── FILOSOFÍA ── -->

<philosophy>

[P1] Motion with purpose.
Cada animación debe:

- dirigir atención
- comunicar jerarquía
- mejorar feedback
- enriquecer UX

Animación sin propósito = ruido visual.

[P2] Progressive enhancement primero.
La aplicación debe funcionar perfectamente:

- sin JS
- durante hydration
- con JS lento
- con animaciones deshabilitadas

[P3] GSAP NO define la arquitectura.
Next.js define:

- rendering
- SSR
- caché
- streaming
- boundaries

GSAP únicamente enriquece la experiencia visual.

[P4] Server-first compatible.
Toda animación debe coexistir con:

- SSR
- RSC
- SEO
- App Router

[P5] Menos JavaScript = mejor performance.
Animar inteligentemente,
NO animar todo indiscriminadamente.

[P6] Las páginas deben sentirse vivas,
pero sin sobrecargar:

- hydration
- CPU
- GPU
- memoria
- batería

[P7] Las animaciones son enhancement visual,
NO requisito funcional.

[P8] El contenido importante debe existir antes de animar.

[P9] Selective animation.
NO todo necesita motion complejo.

[P10] Performance y UX tienen prioridad
sobre espectáculo visual.

</philosophy>

<!-- ── INTEGRACIÓN CON NEXT.JS ── -->

<next_integration>

[N1] GSAP vive EXCLUSIVAMENTE
en Client Components.

[N2] PROHIBIDO:
convertir páginas completas en "use client"
solo para animaciones.

[N3] Animation Bridge — OBLIGATORIO:
usar Client Wrappers pequeños y aislados.

Patrón correcto:

- contenido → Server Component
- data fetching → Server
- metadata → Server
- animación → Client Wrapper

[N4] Los datos SIEMPRE deben venir desde servidor.

[N5] PROHIBIDO:
mover fetching al cliente para animar.

[N6] El HTML SSR debe permanecer:

- visible
- accesible
- estable
  antes de hydration.

[N7] Las animaciones NO deben:

- romper SSR
- romper streaming
- romper SEO
- romper caché
- causar hydration mismatch

[N8] Progressive rendering primero,
motion después.

[N9] Las animaciones deben hidratar
la menor cantidad posible de UI.

[N10] Evitar animation wrappers gigantes.

[N11] Client Components animados:

- pequeños
- reutilizables
- aislados
- específicos

</next_integration>

<!-- ── INSTALACIÓN ── -->

<installation>

[IS1] Instalación:
npm install gsap

[IS2] Plugins:
registrar SIEMPRE antes de usar.

[IS3] Registro:
hacer UNA sola vez por app.

[IS4] PROHIBIDO:
registrar plugins dentro de componentes
que re-renderizan.

[IS5] Ejemplo correcto:

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

[IS6] Imports deben vivir
solo en Client Components.

</installation>

<!-- ── PROGRESSIVE ENHANCEMENT ── -->

<progressive_enhancement>

[PE1] El contenido SSR debe ser visible
ANTES de ejecutar GSAP.

[PE2] PROHIBIDO:
ocultar contenido crítico con CSS base:

❌ opacity: 0
❌ visibility: hidden

si depende de JS para aparecer.

[PE3] Si JS falla:
la UI debe seguir siendo:

- usable
- legible
- accesible

[PE4] Las animaciones NO deben sostener
la comprensión de la interfaz.

[PE5] El contenido importante:

- headings
- texto
- CTAs
- imágenes críticas

debe existir visualmente en SSR.

[PE6] Reveal animations:
deben construirse sobre contenido visible,
NO sobre contenido inexistente.

[PE7] Evitar flashes agresivos
durante hydration.

[PE8] Motion debe complementar el rendering,
NO bloquearlo.

</progressive_enhancement>

<!-- ── CORE API ── -->

<core_api>

[CA1] Métodos principales:

gsap.to()
gsap.from()
gsap.fromTo()

[CA2] Preferir transforms SIEMPRE:

✅ x
✅ y
✅ scale
✅ rotation
✅ xPercent
✅ yPercent

[CA3] PROHIBIDO para movimiento:

❌ top
❌ left
❌ width
❌ height
❌ margin
❌ padding

[CA4] autoAlpha:
usar para fades completos.

autoAlpha:

- opacity
- visibility

[CA5] PROHIBIDO:
opacity: 0 en elementos interactivos
sin controlar visibility.

[CA6] Duraciones recomendadas:

- Feedback (microinteracciones): 0.15s – 0.3s
- Narrative (entradas/secciones): 0.4s – 0.8s

[CA7] Ease debe sentirse natural.

[CA8] Evitar animaciones exageradas
sin intención UX clara.

[CA9] overwrite: "auto"
para prevenir conflictos.

[CA10] gsap.set():
usar para estados iniciales runtime,
NO para ocultar SSR crítico.

</core_api>

<!-- ── TIMELINES ── -->

<timelines>

[TL1] Usar gsap.timeline()
para secuencias complejas.

[TL2] PROHIBIDO:
encadenar múltiples delays manuales.

[TL3] Usar:

- "<"
- "-=0.2"
- labels
- stagger

para sincronización.

[TL4] timelines deben sentirse:

- fluidos
- coherentes
- naturales

[TL5] Evitar secuencias excesivamente largas
que retrasen interacción.

[TL6] Motion debe mejorar ritmo visual,
NO ralentizar UX.

</timelines>

<!-- ── SCROLLTRIGGER ── -->

<scrolltrigger>

[ST1] ScrollTrigger:
usar moderadamente.

[ST2] PROHIBIDO:
crear triggers innecesarios masivos.

[ST3] Limitar observers activos.

[ST4] Las animaciones scroll-based
NO deben bloquear scrolling natural.

[ST5] scrub:
usar solo cuando tenga propósito claro.

[ST6] Scroll reveals:
deben ser ligeros y rápidos.

[ST7] Evitar parallax excesivo.

[ST8] PROHIBIDO:
animaciones scroll que degraden mobile performance.

</scrolltrigger>

<!-- ── PERFORMANCE ── -->

<performance>

[PF1] Prioridad absoluta:
60fps estables.

[PF2] Animar propiedades compositor-friendly:

✅ transform
✅ opacity
✅ autoAlpha

[PF3] PROHIBIDO:
animar layout properties.

[PF4] will-change:
usar SOLO en elementos realmente animados.

[PF5] PROHIBIDO:
will-change masivo.

[PF6] quickTo():
para eventos de alta frecuencia.

[PF7] PROHIBIDO:
gsap.to() dentro de mousemove.

[PF8] stagger:
preferido sobre múltiples tweens manuales.

[PF9] Minimizar:

- repaint
- reflow
- layout thrashing

[PF10] Las animaciones NO deben:

- degradar LCP
- aumentar CLS
- romper INP

[PF11] Evitar hydration cost innecesario
por motion decorativo.

[PF12] Menos motion complejo en mobile.

[PF13] Medir impacto real
en performance antes de escalar motion systems.

</performance>

<!-- ── SPLITTEXT Y DOM MUTATION ── -->

<dom_mutation>

[DM1] SplitText muta el DOM.
Usarlo cuidadosamente.

[DM2] SplitText:
SOLO post-hydration.

[DM3] SplitText sobre contenido SEO crítico:

- Solo post-hydration.
- Asegurar que el texto sea semánticamente accesible en el HTML crudo (SSR).
- Revertir si causa inconsistencias en el accessibility tree.

[DM4] Evitar alterar semántica HTML importante.

[DM5] Las mutaciones DOM NO deben causar:

- hydration mismatch
- layout shift
- accesibilidad rota

[DM6] Revertir mutaciones
cuando sea necesario.

</dom_mutation>

<!-- ── ACCESIBILIDAD ── -->

<accessibility>

[AC1] Respetar prefers-reduced-motion.

[AC2] Implementación obligatoria:

gsap.matchMedia().add(
"(prefers-reduced-motion: no-preference)",
() => {
// animaciones
}
);

[AC3] Para reduce motion:
mostrar contenido sin animación.

[AC4] Motion NO debe impedir:

- lectura
- navegación
- interacción

[AC5] Las animaciones NO son
el único medio de comunicar estado.

[AC6] Mantener:

- focus visibility
- semantic HTML
- keyboard navigation

durante animaciones.

[AC7] autoAlpha debe usarse correctamente
para evitar elementos invisibles bloqueando interacción.

</accessibility>

<!-- ── UX VISUAL ── -->

<ux_visual>

[UX1] Hero sections:
deben tener entrada visual elegante,
sin bloquear rendering.

[UX2] Scroll reveals:
ligeros y rápidos.

[UX3] Motion debe reforzar:

- jerarquía
- ritmo
- atención
- storytelling visual

[UX4] Evitar animation spam.

[UX5] Microinteracciones:
preferidas sobre motion excesivo global.

[UX6] El usuario debe sentir fluidez,
NO notar el framework de animación.

[UX7] Las animaciones deben sentirse:

- premium
- naturales
- modernas
- limpias

NO:

- pesadas
- exageradas
- caóticas

</ux_visual>

<!-- ── PROHIBICIONES CRÍTICAS ── -->

<forbidden>

[F1] PROHIBIDO:
convertir páginas completas en Client Components
solo para usar GSAP.

[F2] PROHIBIDO:
romper SSR por animaciones.

[F3] PROHIBIDO:
ocultar contenido SSR esperando hydration.

[F4] PROHIBIDO:
animar:

- top
- left
- width
- height
  para movimiento.

[F5] PROHIBIDO:
opacity sin autoAlpha
en fades completos.

[F6] PROHIBIDO:
delay manual masivo
en lugar de timelines o stagger.

[F7] PROHIBIDO:
gsap.to() dentro de mousemove.

[F8] PROHIBIDO:
will-change masivo.

[F9] PROHIBIDO:
usar motion decorativo
que degrade performance.

[F10] PROHIBIDO:
causar hydration mismatch.

[F11] PROHIBIDO:
sobrehidratar la app
por animaciones innecesarias.

[F12] PROHIBIDO:
hacer depender la UI principal
de JavaScript.

[F13] PROHIBIDO:
sacrificar SEO o accesibilidad
por efectos visuales.

</forbidden>

</RULE>
