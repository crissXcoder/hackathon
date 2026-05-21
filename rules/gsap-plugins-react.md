---
trigger: model_decision
description: Activar al usar plugins GSAP avanzados (SplitText, Flip, Draggable) o en proyectos React/Next.js con animaciones GSAP.
---

<RULE id="workspace_gsap_plugins_react_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.

El objetivo es usar plugins avanzados de GSAP:

- correctamente
- escalablemente
- sin memory leaks
- sin romper SSR
- sin degradar performance
- sin romper accesibilidad

Los plugins GSAP son herramientas de enriquecimiento visual,
NO sustitutos de arquitectura sólida.

En React y Next.js:
useGSAP es el ÚNICO punto de entrada oficial.
</core_enforcement>

<!-- ───────────────────────────── -->
<!-- SELF CHECK -->
<!-- ───────────────────────────── -->

<self_check>
Antes de implementar plugins GSAP en React/Next.js:

1. ¿El plugin realmente aporta valor UX?
2. ¿Estoy usando useGSAP como único entry point?
3. ¿Registré el plugin antes de usarlo?
4. ¿Estoy evitando convertir páginas completas en Client Components?
5. ¿Estoy usando un Client Wrapper pequeño?
6. ¿El contenido sigue funcionando sin JS?
7. ¿El plugin afecta SSR o hydration?
8. ¿Estoy respetando prefers-reduced-motion?
9. ¿Estoy evitando memory leaks?
10. ¿Estoy usando scope correctamente?
11. ¿Estoy evitando string selectors globales?
12. ¿La animación degrada LCP, CLS o INP?
13. ¿El plugin realmente necesita existir aquí?
14. ¿Estoy evitando sobrehidratación innecesaria?
15. ¿Estoy preservando accesibilidad y semantic HTML?
    </self_check>

<!-- ───────────────────────────── -->
<!-- FILOSOFÍA -->
<!-- ───────────────────────────── -->

<philosophy>

[P1] Los plugins son enhancement visual,
NO dependencia funcional.

[P2] Motion debe:

- enriquecer UX
- reforzar jerarquía
- mejorar storytelling
- aportar claridad visual

NO:

- distraer
- ralentizar
- sobrecargar

[P3] Next.js mantiene el control de:

- SSR
- SEO
- streaming
- rendering
- caché

[P4] GSAP únicamente enriquece
la experiencia visual.

[P5] useGSAP es el estándar oficial
para React.

[P6] Memory safety es obligatoria.

[P7] Todo plugin debe coexistir con:

- SSR
- App Router
- progressive enhancement
- accessibility

[P8] El contenido importante
debe existir antes de animar.

[P9] Menos plugins = mejor mantenibilidad.

[P10] UX y performance tienen prioridad
sobre efectos visuales complejos.

</philosophy>

<!-- ───────────────────────────── -->
<!-- REACT / NEXT.JS -->
<!-- ───────────────────────────── -->

<react_nextjs>

[RN1] useGSAP es el ÚNICO entry point oficial
para GSAP en React.

import { useGSAP } from "@gsap/react";

[RN2] PROHIBIDO:
usar useEffect para GSAP
cuando useGSAP está disponible.

[RN3] Patrón obligatorio:

const container = useRef(null);

useGSAP(() => {
gsap.from(".item", {
autoAlpha: 0,
y: 20,
duration: 0.6
});
}, { scope: container });

[RN4] Scope es OBLIGATORIO.

[RN5] PROHIBIDO:
string selectors globales sin scope.

[RN6] useGSAP maneja cleanup automáticamente.

[RN7] En React:
si un ScrollTrigger o plugin
se crea fuera de useGSAP,
se considera bug de memoria.

[RN8] Cleanup manual:
SOLO aplica para:

- Vanilla JS
- integraciones externas avanzadas
- casos fuera del lifecycle React

[RN9] Los plugins deben vivir:

- dentro de useGSAP
- scoped
- aislados

[RN10] contextSafe():
usar para handlers React.

[RN11] Evitar side effects GSAP
fuera del lifecycle React.

[RN12] Los wrappers animados deben ser:

- pequeños
- reutilizables
- específicos

[RN13] PROHIBIDO:
convertir páginas completas en Client Components
solo por plugins GSAP.

</react_nextjs>

<!-- ───────────────────────────── -->
<!-- REGISTRO -->
<!-- ───────────────────────────── -->

<registration>

[R1] Registrar SIEMPRE plugins
antes de usarlos.

[R2] Registro UNA sola vez por app.

[R3] PROHIBIDO:
registrar plugins dentro de componentes
que re-renderizan.

[R4] Ejemplo correcto:

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

[R5] Plugins dependientes de window
NO deben ejecutarse durante SSR.

[R6] Imports GSAP:
solo en Client Components.

</registration>

<!-- ───────────────────────────── -->
<!-- SPLITTEXT -->
<!-- ───────────────────────────── -->

<splittext>

[ST1] SplitText muta el DOM.

[ST2] Usar SOLO post-hydration.

[ST3] PROHIBIDO:
usar SplitText sobre contenido SEO crítico
durante SSR.

[ST4] SplitText debe respetar:

- semantic HTML
- accessibility
- readability

[ST5] Accessibility:
mantener aria-label correcto.

[ST6] autoSplit:
usar cuando el texto sea responsive.

[ST7] split.revert():
obligatorio fuera de useGSAP.

[ST8] En React + useGSAP:
el cleanup automático suele ser suficiente.

[ST9] Evitar SplitText masivo
sobre grandes bloques de contenido.

[ST10] SplitText debe reservarse para:

- hero headings
- títulos premium
- motion editorial

NO para texto arbitrario.

[ST11] PROHIBIDO:
causar layout shift con SplitText.

</splittext>

<!-- ───────────────────────────── -->
<!-- SCROLLSMOOTHER -->
<!-- ───────────────────────────── -->

<scrollsmoother>

[SM1] ScrollSmoother:
usar SOLO cuando el diseño lo justifique claramente.

[SM2] PROHIBIDO:
usar ScrollSmoother por moda visual.

[SM3] ScrollSmoother NO debe:

- romper scroll nativo
- degradar mobile
- afectar accesibilidad

[SM4] El scroll debe sentirse:

- natural
- fluido
- ligero

NO artificial.

[SM5] Evitar smooth exagerado.

[SM6] PROHIBIDO:
scroll hijacking agresivo.

[SM7] En mobile:
reducir complejidad de smoothing.

[SM8] ScrollSmoother debe probarse en:

- low-end devices
- touch devices
- navegación teclado

</scrollsmoother>

<!-- ───────────────────────────── -->
<!-- FLIP -->
<!-- ───────────────────────────── -->

<flip>

[FL1] Flip:
usar para cambios de layout complejos.

[FL2] Flip debe:

- suavizar transiciones
- preservar continuidad visual

[FL3] PROHIBIDO:
usar Flip para motion trivial.

[FL4] Las transiciones Flip
NO deben causar CLS visible.

[FL5] Evitar:

- layouts gigantes
- grids extremadamente pesados

[FL6] Flip debe sentirse:

- rápido
- limpio
- natural

</flip>

<!-- ───────────────────────────── -->
<!-- DRAGGABLE -->
<!-- ───────────────────────────── -->

<draggable>

[DG1] Draggable:
usar SOLO cuando exista interacción real.

[DG2] Drag interactions deben:

- sentirse responsivas
- funcionar en touch
- respetar accesibilidad

[DG3] Evitar draggable decorativo.

[DG4] inertia:
usar moderadamente.

[DG5] Dragging NO debe:

- bloquear scrolling
- romper mobile UX
- causar lag

[DG6] Mantener bounds definidos
cuando aplique.

</draggable>

<!-- ───────────────────────────── -->
<!-- MOTION PATH -->
<!-- ───────────────────────────── -->

<motionpath>

[MP1] MotionPath:
usar SOLO cuando la narrativa visual lo justifique.

[MP2] Evitar motion paths complejos innecesarios.

[MP3] Paths deben sentirse:

- suaves
- naturales
- legibles

[MP4] PROHIBIDO:
motion caótico o distractor.

[MP5] MotionPath NO debe:

- afectar readability
- distraer del contenido principal

</motionpath>

<!-- ───────────────────────────── -->
<!-- MORPHSVG -->
<!-- ───────────────────────────── -->

<morphsvg>

[MS1] MorphSVG:
usar para transiciones visuales premium.

[MS2] Morphs deben ser:

- claros
- suaves
- rápidos

[MS3] Evitar morphs excesivamente complejos.

[MS4] SVG animations NO deben:

- degradar performance
- bloquear rendering

[MS5] Mantener SVG optimizados.

</morphsvg>

<!-- ───────────────────────────── -->
<!-- OBSERVER -->
<!-- ───────────────────────────── -->

<observer>

[OB1] Observer:
usar moderadamente.

[OB2] PROHIBIDO:
interceptar gestos innecesariamente.

[OB3] Observer NO debe:

- romper scroll natural
- bloquear touch gestures
- degradar UX mobile

[OB4] Gestures deben sentirse:

- naturales
- responsivos
- previsibles

</observer>

<!-- ───────────────────────────── -->
<!-- CUSTOM EASE -->
<!-- ───────────────────────────── -->

<custom_ease>

[CE1] CustomEase:
usar SOLO cuando los eases estándar
no sean suficientes.

[CE2] Los eases personalizados
deben sentirse:

- naturales
- fluidos
- consistentes

[CE3] PROHIBIDO:
curvas exageradas o caóticas.

</custom_ease>

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

[PF3] Propiedades: Seguir estrictamente las prohibiciones de rendimiento definidas en gsap-core.md.

[PF4] Minimizar:

- repaint
- reflow
- layout thrashing

[PF5] Plugins NO deben:

- degradar LCP
- aumentar CLS
- romper INP

[PF6] Evitar hydration cost innecesario.

[PF7] Mobile:
menos motion complejo.

[PF8] Medir impacto real
antes de introducir plugins pesados.

[PF9] Evitar múltiples plugins complejos
en la misma sección.

[PF10] Performance > complejidad visual.

</performance>

<!-- ───────────────────────────── -->
<!-- SEO / ESTABILIDAD -->
<!-- ───────────────────────────── -->

<seo_stability>

[SS1] El contenido importante
debe existir antes de animar.

[SS2] PROHIBIDO:
ocultar contenido SSR
esperando hydration.

[SS3] Plugins NO deben:

- causar hydration mismatch
- causar CLS
- romper SEO

[SS4] Hero content:
usar motion ligero y estable.

[SS5] Máximo recomendado
para hero reveals:
y: 20

[SS6] La estabilidad visual
tiene prioridad sobre cinematic effects.

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
// plugins GSAP
}
);

[AC3] Para reduce motion:
mostrar contenido sin animación.

[AC4] Plugins NO deben impedir:

- lectura
- navegación
- interacción

[AC5] Las animaciones NO son
el único medio de comunicar estado.

[AC6] Mantener:

- semantic HTML
- focus visible
- keyboard navigation

durante motion.

[AC7] Plugins que muten DOM
deben preservar accessibility tree.

</accessibility>

<!-- ───────────────────────────── -->
<!-- RESPONSABILIDAD DEL AGENTE -->
<!-- ───────────────────────────── -->

<agent_behavior>

[A1] Antes de proponer plugins:
evaluar si realmente son necesarios.

[A2] Prioridad:
microinteracciones limpias
sobre efectos complejos.

[A3] SplitText:
solo para headings premium.

[A4] ScrollSmoother:
solo para experiencias cinematográficas justificadas.

[A5] Flip:
preferido para layout transitions complejas.

[A6] Advertir siempre sobre:

- performance impact
- accessibility
- hydration
- mobile degradation

[A7] El agente debe:

- preservar SSR
- preservar SEO
- minimizar hydration
- evitar sobreingeniería visual

</agent_behavior>

<!-- ───────────────────────────── -->
<!-- PROHIBICIONES CRÍTICAS -->
<!-- ───────────────────────────── -->

<forbidden>

[F1] PROHIBIDO:
usar useEffect para GSAP
cuando useGSAP existe.

[F2] PROHIBIDO:
crear ScrollTriggers fuera de useGSAP en React.

[F3] PROHIBIDO:
string selectors globales sin scope.

[F4] PROHIBIDO:
convertir páginas completas en Client Components
solo por motion.

[F5] PROHIBIDO:
romper SSR o hydration.

[F6] PROHIBIDO:
ocultar contenido SSR esperando JS.

[F7] PROHIBIDO:
causar CLS con plugins.

[F8] PROHIBIDO:
scroll hijacking agresivo.

[F9] PROHIBIDO:
motion decorativo que degrade performance.

[F10] PROHIBIDO:
dejar listeners o triggers vivos
fuera del lifecycle React.

[F11] PROHIBIDO:
usar SplitText masivamente
en contenido SEO crítico.

[F12] PROHIBIDO:
markers activos en producción.

[F13] PROHIBIDO:
sacrificar accesibilidad
por efectos visuales.

[F14] PROHIBIDO:
usar plugins complejos sin justificación UX clara.

[F15] PROHIBIDO:
sobrehidratar la app
por motion innecesario.

[F16] PROHIBIDO:
usar GSAP plugins como reemplazo
de arquitectura frontend sólida.

</forbidden>

</RULE>
