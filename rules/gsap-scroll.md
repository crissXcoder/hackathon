---
trigger: model_decision
description: Activar al implementar scroll animations, parallax, ScrollTrigger, scroll reveal, pin de secciones o patrones de página animada.
---

<RULE id="workspace_gsap_scroll_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.

El objetivo de ScrollTrigger es:

- enriquecer la narrativa visual
- reforzar jerarquía
- mejorar ritmo visual
- crear motion contextual

SIN sacrificar:

- SSR
- SEO
- performance
- accesibilidad
- estabilidad visual
- smooth scrolling nativo
- App Router architecture

ScrollTrigger es enhancement visual,
NO dependencia funcional.
</core_enforcement>

<self_check>
Antes de implementar ScrollTrigger:

1. ¿El contenido sigue siendo usable sin JS?
2. ¿Estoy usando useGSAP como único entry point en React?
3. ¿Registré ScrollTrigger antes de usarlo?
4. ¿Estoy evitando convertir páginas completas en Client Components?
5. ¿El trigger vive dentro de un Client Wrapper pequeño?
6. ¿La animación afecta LCP o CLS?
7. ¿Estoy usando transform y NO layout properties?
8. ¿Estoy evitando demasiados triggers simultáneos?
9. ¿Estoy respetando prefers-reduced-motion?
10. ¿Los markers están desactivados en producción?
11. ¿El scroll sigue sintiéndose natural?
12. ¿Estoy evitando scroll hijacking?
13. ¿Estoy usando scrub solo cuando realmente aporta valor?
14. ¿Estoy evitando parallax agresivo en mobile?
15. ¿La animación mejora UX real o solo añade ruido?
    </self_check>

<philosophy>

[P1] ScrollTrigger es storytelling visual,
NO espectáculo visual.

[P2] El scroll debe sentirse:

- natural
- fluido
- responsivo

NO:

- pesado
- bloqueado
- artificial

[P3] Progressive enhancement primero.
La UI debe funcionar:

- sin JS
- durante hydration
- con motion reducido

[P4] ScrollTrigger NO define arquitectura.
Next.js mantiene:

- SSR
- streaming
- SEO
- rendering
- caché

[P5] Motion contextual.
Las animaciones deben responder
al flujo natural del usuario.

[P6] Menos triggers = mejor performance.

[P7] Scroll reveal debe complementar contenido,
NO esconderlo.

[P8] La estabilidad visual es superior
al motion complejo.

[P9] Las animaciones scroll-based
NO deben ralentizar lectura ni navegación.

[P10] UX y performance tienen prioridad
sobre cinematic effects.

</philosophy>

<react_nextjs>

[RN1] ScrollTrigger vive EXCLUSIVAMENTE
en Client Components.

[RN2] PROHIBIDO:
convertir páginas completas en "use client"
solo para scroll animations.

[RN3] Animation Bridge — obligatorio.

Patrón correcto:

- contenido → Server Component
- fetching → Server
- SEO → Server
- motion → Client Wrapper pequeño

[RN4] useGSAP es el único entry point oficial
en React.

[RN5] PROHIBIDO:
crear ScrollTriggers fuera de useGSAP.

[RN6] Si un ScrollTrigger existe
fuera de useGSAP en React,
se considera bug de memoria.

[RN7] useGSAP maneja cleanup automáticamente.

[RN8] Ignorar cleanup manual
cuando useGSAP está presente.

[RN9] Cleanup manual SOLO aplica para:

- Vanilla JS
- sistemas externos avanzados
- casos fuera del lifecycle React

[RN10] Los triggers deben estar:

- scoped
- aislados
- contenidos

[RN11] PROHIBIDO:
string selectors globales sin scope.

[RN12] Evitar wrappers gigantes animados.

</react_nextjs>

<!-- ───────────────────────────── -->
<!-- REGISTRO -->
<!-- ───────────────────────────── -->

<registration>

[R1] Registro obligatorio:

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

[R2] Registrar plugins UNA sola vez por app.

[R3] PROHIBIDO:
registrar plugins dentro de componentes
que re-renderizan.

[R4] Imports GSAP:
solo en Client Components.

[R5] Plugins dependientes de window
NO deben ejecutarse durante SSR.

</registration>

<!-- ───────────────────────────── -->
<!-- PRINCIPIOS DE SCROLLTRIGGER -->
<!-- ───────────────────────────── -->

<scrolltrigger_core>

[ST1] ScrollTrigger debe usarse moderadamente.

[ST2] PROHIBIDO:
crear triggers masivos innecesarios.

[ST3] Minimizar observers activos.

[ST4] Scroll animations:
deben sentirse ligeras y rápidas.

[ST5] El scrolling natural tiene prioridad
sobre el motion.

[ST6] ScrollTrigger NO debe:

- bloquear scroll
- secuestrar scroll
- ralentizar navegación

[ST7] Las animaciones scroll-based
deben:

- complementar
- enriquecer
- contextualizar

NO:

- distraer
- retrasar
- saturar

[ST8] Reveal animations:
deben ser:

- sutiles
- rápidas
- estables

[ST9] Menos motion complejo en mobile.

[ST10] Evitar animation spam
en cada elemento pequeño.

</scrolltrigger_core>

<!-- ───────────────────────────── -->
<!-- START / END -->
<!-- ───────────────────────────── -->

<start_end>

[SE1] Formato:

"triggerPosition viewportPosition"

Ejemplos:

- "top 80%"
- "top center"
- "bottom 20%"
- "top top"

[SE2] Reveal estándar recomendado:
start: "top 85%"

[SE3] Evitar starts demasiado tempranos
que disparen múltiples triggers simultáneos.

[SE4] end:
debe ser coherente con duración visual.

[SE5] PROHIBIDO:
ranges gigantes innecesarios.

</start_end>

<!-- ───────────────────────────── -->
<!-- TOGGLE ACTIONS -->
<!-- ───────────────────────────── -->

<toggle_actions>

[TA1] toggleActions:
usar para reveals y playback controlado.

[TA2] Patrón recomendado:
"play none none reverse"

[TA3] Usar:

- reverse
- restart
- pause

solo cuando UX lo justifique.

[TA4] Evitar configuraciones complejas
sin necesidad real.

</toggle_actions>

<!-- ───────────────────────────── -->
<!-- SCRUB -->
<!-- ───────────────────────────── -->

<scrub>

[SC1] scrub:
usar SOLO cuando tenga propósito claro.

[SC2] scrub:
debe sentirse:

- suave
- natural
- ligero

[SC3] Para scrub:
usar ease: "none"

[SC4] PROHIBIDO:
usar scrub y toggleActions
en el mismo trigger.

[SC5] Evitar scrub en:

- elementos críticos
- mobile pesado
- contenido largo

[SC6] scrub excesivo puede degradar:

- INP
- smoothness
- batería

</scrub>

<!-- ───────────────────────────── -->
<!-- PIN -->
<!-- ───────────────────────────── -->

<pin>

[P1] pin:
usar con moderación.

[P2] Pinning excesivo degrada UX.

[P3] PROHIBIDO:
secciones pinned innecesariamente largas.

[P4] pinSpacing:
mantener true por defecto.

[P5] pinSpacing: false
solo si el layout está controlado explícitamente.

[P6] El usuario NO debe sentirse atrapado
durante el scroll.

[P7] Evitar pinning agresivo en mobile.

</pin>

<!-- ───────────────────────────── -->
<!-- REVEALS -->
<!-- ───────────────────────────── -->

<reveals>

[RV1] Scroll reveal:
es el patrón base recomendado.

[RV2] Los reveals deben usar:

- opacity
- autoAlpha
- y sutil

[RV3] Máximo recomendado:
y: 20 (Above-the-fold) a 40 (Resto).

[RV4] PROHIBIDO:
reveals agresivos
que empujen layout.

[RV5] Reveal animations:
NO deben causar CLS.

[RV6] Contenido importante:
debe existir antes del reveal.

[RV7] Reveal ≠ ocultar SSR.

[RV8] El contenido debe ser:

- legible
- estable
- accesible
  antes de animar.

</reveals>

<!-- ───────────────────────────── -->
<!-- PARALLAX -->
<!-- ───────────────────────────── -->

<parallax>

[PX1] Parallax:
usar moderadamente.

[PX2] Parallax debe sentirse:

- suave
- premium
- sutil

[PX3] PROHIBIDO:
parallax extremo.

[PX4] Limitar yPercent
en mobile.

[PX5] Evitar:

- movimientos exagerados
- múltiples capas complejas

[PX6] El parallax NO debe:

- degradar performance
- bloquear lectura
- marear usuarios

</parallax>

<!-- ───────────────────────────── -->
<!-- PERFORMANCE -->
<!-- ───────────────────────────── -->

<performance>

[PF1] Prioridad absoluta:
60fps estables.

[PF2] Animar SOLO:
✅ transform
✅ opacity
✅ autoAlpha

[PF3] PROHIBIDO:
animar:

- top
- left
- width
- height
- margin
- padding

[PF4] Minimizar:

- repaint
- reflow
- layout thrashing

[PF5] will-change:
usar SOLO en elementos realmente animados.

[PF6] PROHIBIDO:
will-change masivo.

[PF7] stagger:
preferido sobre múltiples tweens individuales.

[PF8] ScrollTrigger NO debe:

- degradar LCP
- aumentar CLS
- romper INP

[PF9] Evitar hydration cost innecesario.

[PF10] Menos motion complejo en mobile.

[PF11] Medir impacto real
antes de escalar sistemas scroll-heavy.

[PF12] Las animaciones scroll-based
deben probarse en dispositivos reales.

</performance>

<refresh>

[RF1] ScrollTrigger.refresh():
ejecutar SIEMPRE tras cambios de layout (imágenes/data) dentro de useGSAP o useEffect para asegurar el recálculo correcto de triggers.

[RF2] Ejemplos válidos:

- imágenes cargadas
- fuentes dinámicas
- contenido lazy
- route transitions complejas

[RF3] PROHIBIDO:
refresh innecesario frecuente.

[RF4] Refresh excesivo
puede degradar performance.

</refresh>

<!-- ───────────────────────────── -->
<!-- ESTABILIDAD VISUAL / SEO -->
<!-- ───────────────────────────── -->

<seo_stability>

[SS1] La estabilidad del layout
es superior al motion.

[SS2] PROHIBIDO:
animaciones scroll
que desplacen layout crítico.

[SS3] LCP Protection — obligatorio.

Hero:

- headings
- imágenes
- CTAs

NO deben tener:

- movimientos agresivos
- escalas exageradas
- desplazamientos largos

durante initial render.

[SS4] Para LCP elements:
usar SOLO:

- autoAlpha
- opacity
- y muy sutil

Máximo recomendado:
y: 20

[SS5] PROHIBIDO:
scroll animations que causen CLS.

[SS6] El motion inicial debe:

- complementar
- suavizar
- enriquecer

NO:

- recolocar
- empujar
- reorganizar layout

[SS7] SEO y estabilidad visual
tienen prioridad sobre cinematic effects.

</seo_stability>

<!-- ───────────────────────────── -->
<!-- ACCESIBILIDAD -->
<!-- ───────────────────────────── -->

<accessibility>

[AC1] Respetar prefers-reduced-motion.

[AC2] Implementación obligatoria:

gsap.matchMedia().add(
"(prefers-reduced-motion: no-preference)",
() => {
// ScrollTrigger animations
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

- focus visible
- navegación teclado
- semantic HTML

durante motion.

[AC7] ScrollTrigger NO debe romper:

- tab order
- accessibility tree
- screen readers

</accessibility>

<!-- ───────────────────────────── -->
<!-- PATRONES RECOMENDADOS -->
<!-- ───────────────────────────── -->

<patterns>

[PT1] Hero:
entrada ligera y rápida.

[PT2] Secciones:
scroll reveal sutil.

[PT3] Cards:
microinteracciones suaves.

[PT4] Navbar:
transición mínima basada en scroll.

[PT5] Parallax:
solo en imágenes decorativas.

[PT6] Horizontal scroll:
solo cuando UX lo justifique claramente.

[PT7] Motion debe reforzar:

- jerarquía
- ritmo
- atención
- narrativa

NO distraer del contenido.

</patterns>

<!-- ───────────────────────────── -->
<!-- DEBUG -->
<!-- ───────────────────────────── -->

<debug>

[D1] markers: true
SOLO en desarrollo.

[D2] PROHIBIDO:
markers en producción.

[D3] Validar:

- mobile
- low-end devices
- reduced motion
- hydration stability

antes de aprobar.

</debug>

<!-- ───────────────────────────── -->
<!-- PROHIBICIONES CRÍTICAS -->
<!-- ───────────────────────────── -->

<forbidden>

[F1] PROHIBIDO:
usar ScrollTrigger fuera de useGSAP en React.

[F2] PROHIBIDO:
convertir páginas completas en Client Components
solo para scroll animations.

[F3] PROHIBIDO:
scrub y toggleActions juntos.

[F4] PROHIBIDO:
markers activos en producción.

[F5] PROHIBIDO:
crear triggers masivos innecesarios.

[F6] PROHIBIDO:
scroll hijacking.

[F7] PROHIBIDO:
parallax excesivo.

[F8] PROHIBIDO:
animaciones que causen CLS.

[F9] PROHIBIDO:
ocultar contenido SSR esperando hydration.

[F10] PROHIBIDO:
animar:

- top
- left
- width
- height

[F11] PROHIBIDO:
motion decorativo
que degrade performance.

[F12] PROHIBIDO:
sobrehidratar la app
por scroll animations innecesarias.

[F13] PROHIBIDO:
sacrificar SEO o accesibilidad
por efectos visuales.

[F14] PROHIBIDO:
dejar triggers vivos fuera del lifecycle React.

[F15] PROHIBIDO:
pinning agresivo que atrape al usuario.

[F16] PROHIBIDO:
usar ScrollTrigger como reemplazo
de arquitectura UX sólida.

</forbidden>

</RULE>
