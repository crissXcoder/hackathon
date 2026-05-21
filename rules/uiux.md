---
trigger: glob
globs: **/*.tsx, **/*.jsx, **/*.css
---

<RULE id="workspace_uiux_v3" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.

El objetivo del sistema UI/UX es crear interfaces:

- claras
- rápidas
- accesibles
- coherentes
- fluidas
- modernas

SIN sacrificar:

- performance
- SSR
- SEO
- accesibilidad
- estabilidad visual
- mantenibilidad

La experiencia del usuario tiene prioridad
sobre efectos visuales decorativos.

Violarlas =:

- mala UX
- pérdida de usabilidad
- Core Web Vitals deficientes
- inconsistencia visual
- interfaces confusas
- degradación de accesibilidad
  </core_enforcement>

<!-- ── SELF CHECK ── -->

<self_check>
Antes de implementar cualquier UI:

1. ¿La interfaz se entiende sin explicación?
2. ¿La página sigue siendo usable sin animaciones?
3. ¿Estoy respetando mobile-first?
4. ¿Cumple WCAG?
5. ¿Existen estados completos (loading/error/empty/success)?
6. ¿Estoy usando el design system real?
7. ¿La UI carga rápido y estable?
8. ¿Estoy evitando CLS y LCP innecesarios?
9. ¿La animación mejora UX o solo agrega ruido?
10. ¿Estoy priorizando claridad sobre espectáculo visual?
    </self_check>

<!-- ── FILOSOFÍA ── -->

<philosophy>

[P1] Función sobre estética.
Cada elemento visual debe tener propósito claro.

[P2] Claridad inmediata.
El usuario debe comprender:

- estructura
- navegación
- acciones
  sin instrucciones externas.

[P3] UX primero.
La experiencia tiene prioridad sobre:

- efectos visuales
- motion excesivo
- complejidad innecesaria

[P4] Consistencia sobre creatividad aislada.

[P5] Progressive enhancement.
La aplicación debe funcionar correctamente:

- sin JS
- sin animaciones
- durante hydration
- con conexión lenta

[P6] Motion es enriquecimiento visual,
NO requisito funcional.

[P7] Feedback continuo.
Toda acción del usuario debe tener respuesta visible.

[P8] Accesibilidad no es opcional.

[P9] Performance percibida importa tanto
como performance técnica.

[P10] El usuario debe sentir:

- fluidez
- estabilidad
- velocidad
- claridad

NO:

- caos visual
- retraso
- sobreanimación
- distracción

</philosophy>

<!-- ── MOBILE FIRST ── -->

<mobile_first>

[M1] Diseñar desde mobile primero.

[M2] Base recomendada:
375px.

[M3] Escalar progresivamente:
sm → md → lg → xl.

[M4] Priorizar layouts:

- verticales
- simples
- legibles

[M5] Evitar:

- grids complejos en mobile
- horizontal scroll
- densidad excesiva

[M6] Touch targets mínimos:
44x44px.

[M7] El contenido crítico
debe aparecer primero en mobile.

[M8] Above-the-fold:
priorizar:

- claridad
- CTA principal
- contenido esencial

[M9] Hover NO debe ser requisito funcional.

[M10] Mobile performance
tiene prioridad sobre efectos decorativos.

</mobile_first>

<!-- ── ACCESIBILIDAD ── -->

<accessibility>

[A1] Cumplir WCAG AA mínimo.

[A2] Contraste:

- 4.5:1 texto normal
- 3:1 texto grande e iconos

[A3] Focus visible:
OBLIGATORIO.

[A4] PROHIBIDO:
eliminar outline
sin reemplazo accesible.

[A5] Usar HTML semántico correcto:

- button
- nav
- main
- section
- article
- header
- footer

[A6] aria-label:
obligatorio si no existe texto visible.

[A7] role:
usar solo cuando HTML nativo
no sea suficiente.

[A8] Formularios:

- label SIEMPRE asociado
- placeholder NO reemplaza label

[A9] Navegación completa por teclado:

- tab
- enter
- escape
- arrows cuando aplique

[A10] Las animaciones NO deben:

- impedir lectura
- impedir interacción
- ocultar información crítica

[A11] prefers-reduced-motion:
debe respetarse SIEMPRE.

[A12] El contenido importante
debe existir visualmente antes de animar.

</accessibility>

<!-- ── PERFORMANCE VISUAL ── -->

<performance>

[R1] Core Web Vitals:
prioridad obligatoria.

[R2] LCP objetivo:
< 2.5s.

[R3] CLS:
debe minimizarse agresivamente.

[R4] INP/FID:
no bloquear main thread.

[R5] El contenido crítico SSR
debe aparecer inmediatamente visible.

[R6] Imágenes:
usar next/image.

[R7] priority:
obligatorio en imágenes above-the-fold.

[R8] Reservar espacio visual:

- width/height
- aspect-ratio
- contenedores estables

[R9] PROHIBIDO:
layout shifts durante carga inicial.

[R10] LCP Protection — OBLIGATORIO:

El elemento principal:

- hero image
- hero title
- main heading
- primary CTA

NO debe tener animaciones agresivas
durante carga inicial.

Permitido:

- opacity
- autoAlpha
- y sutil (máximo ~20px)

PROHIBIDO:

- grandes desplazamientos
- escalas agresivas
- motion cinematográfico excesivo
- animaciones que retrasen estabilidad visual

[R11] Las animaciones NO deben:

- empujar layout
- desplazar contenido
- alterar flujo principal
  durante render inicial.

[R12] Performance percibida:
prioridad superior a espectáculo visual.

[R13] Evitar:

- observers excesivos
- listeners innecesarios
- hydration cost decorativo

[R14] Motion debe sentirse:

- ligero
- rápido
- natural

[R15] Menos motion complejo en mobile.

</performance>

<!-- ── MOTION Y FEEDBACK ── -->

<motion>

[MO1] Motion debe tener propósito UX claro.

[MO2] Motion válido:

- feedback
- jerarquía
- continuidad
- orientación visual
- microinteracciones

[MO3] Motion decorativo excesivo:
PROHIBIDO.

[MO4] Duración estándar:

- Feedback: 150ms – 300ms.
- Entradas/Narrativa: 400ms – 800ms.

[MO5] >400ms:
se percibe lento
salvo casos narrativos específicos.

[MO6] Motion debe complementar,
NO bloquear interacción.

[MO7] El contenido importante
debe existir antes de animar.

[MO8] Las páginas deben sentirse fluidas,
NO teatralizadas.

[MO9] Scroll reveals:

- rápidos
- ligeros
- discretos

[MO10] PROHIBIDO:
animaciones masivas innecesarias.

[MO11] Las animaciones NO deben:

- degradar LCP
- degradar CLS
- degradar INP
- romper SSR

[MO12] Microinteracciones:
preferidas sobre motion global agresivo.

[MO13] Ninguna acción debe ser silenciosa.

[MO14] Estados visuales obligatorios:

- loading
- success
- error
- empty
- disabled

[MO15] Skeletons:
preferidos sobre spinners
cuando la estructura es conocida.

[MO16] Progressive enhancement:
la UI debe seguir funcionando
sin motion.

</motion>

<!-- ── SISTEMA DE DISEÑO ── -->

<design_system>

[DS1] Usar exclusivamente:

- design tokens
- primitives oficiales
- spacing scale
- semantic colors

[DS2] Consistencia:
un patrón = una solución reutilizable.

[DS3] PROHIBIDO:
inventar patrones aislados
sin justificación.

[DS4] Todo componente nuevo
debe documentar:

- propósito
- props
- variantes
- estados

[DS5] Los componentes deben ser:

- reutilizables
- escalables
- mantenibles

[DS6] Naming:
consistente y semántico.

[DS7] PROHIBIDO:
colores hardcodeados.

[DS8] PROHIBIDO:
spacing arbitrario innecesario.

</design_system>

<!-- ── ESTADOS DE UI ── -->

<ui_states>

[U1] Loading:
mostrar:

- skeleton
- placeholder
- indicador visible

[U2] Empty:
mensaje claro

- acción sugerida.

[U3] Error:
mensaje entendible

- posible solución.

[U4] Success:
feedback claro e inmediato.

[U5] Disabled:
estado visual distinguible.

[U6] Explicar disabled
cuando sea relevante.

[U7] Estados deben sentirse consistentes
en toda la aplicación.

</ui_states>

<!-- ── INTERACCIONES ── -->

<interactions>

[I1] Toda interacción
debe tener feedback inmediato.

[I2] Hover:
solo como enhancement desktop.

[I3] PROHIBIDO:
depender de hover para funcionalidad principal.

[I4] Active:
estado visual claro.

[I5] Forms:
validación:

- realtime
  o
- submit feedback claro

[I6] Navegación:
transiciones rápidas y fluidas.

[I7] Las interacciones deben sentirse:

- responsivas
- naturales
- previsibles

[I8] Evitar:

- retrasos artificiales
- waits innecesarios
- feedback tardío

</interactions>

<!-- ── ESTABILIDAD VISUAL ── -->

<visual_stability>

[VS1] La estabilidad visual
tiene prioridad sobre motion decorativo.

[VS2] El contenido NO debe:

- saltar
- desplazarse agresivamente
- cambiar tamaño inesperadamente

durante carga inicial.

[VS3] PROHIBIDO:
animaciones que empujen otros elementos
en el flujo del documento.

[VS4] Hero sections:
deben estabilizarse rápidamente.

[VS5] El usuario debe percibir:

- velocidad
- estabilidad
- control

desde el primer render.

[VS6] Motion cinematográfico agresivo:
solo permitido
si NO afecta:

- UX
- performance
- estabilidad
- accesibilidad

</visual_stability>

<!-- ── RESPONSABILIDAD DEL AGENTE ── -->

<agent_behavior>

[AB1] El agente DEBE priorizar:

- claridad
- accesibilidad
- performance
- estabilidad
  sobre efectos visuales.

[AB2] El agente DEBE detectar:

- CLS potencial
- motion excesivo
- hydration cost innecesario
- patrones confusos

[AB3] El agente DEBE favorecer:

- microinteracciones
- progressive enhancement
- layouts estables

sobre motion agresivo.

[AB4] El agente NO debe:
sacrificar UX por espectacularidad visual.

[AB5] El agente DEBE mantener:

- coherencia
- predictibilidad
- simplicidad
  en toda la experiencia.

</agent_behavior>

<!-- ── PROHIBICIONES CRÍTICAS ── -->

<forbidden>

[F1] PROHIBIDO:
diseñar solo para desktop.

[F2] PROHIBIDO:
romper accesibilidad por estética.

[F3] PROHIBIDO:
colores fuera del sistema de tokens.

[F4] PROHIBIDO:
spacing arbitrario innecesario.

[F5] PROHIBIDO:
acciones sin feedback visual.

[F6] PROHIBIDO:
componentes sin estados UI.

[F7] PROHIBIDO:
animaciones que degraden:

- LCP
- CLS
- INP

[F8] PROHIBIDO:
motion agresivo en elementos LCP.

[F9] PROHIBIDO:
ocultar contenido crítico esperando hydration.

[F10] PROHIBIDO:
hacer depender UX principal de JavaScript.

[F11] PROHIBIDO:
layout shifts visibles durante carga.

[F12] PROHIBIDO:
sobreanimar interfaces.

[F13] PROHIBIDO:
sacrificar claridad por espectáculo visual.

[F14] PROHIBIDO:
usar motion decorativo sin propósito UX real.

</forbidden>

</RULE>
