---
trigger: manual
---

<RULE id="workspace_stitch_v3" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.

Stitch MCP es una herramienta de:

- exploración visual
- generación de pantallas
- iteración UX
- aceleración de prototipado

NO es:

- autoridad del design system
- arquitecto frontend
- reemplazo de ingeniería UI
- fuente de verdad visual

Todo output generado debe alinearse obligatoriamente
con:

- shadcn/ui
- design tokens
- arquitectura del proyecto
- patrones UI existentes

Violarlas =:

- inconsistencia visual
- deuda técnica
- duplicación de sistemas
- fragmentación UX
- pantallas no mantenibles
  </core_enforcement>

<!-- ── SELF CHECK ── -->

<self_check>
Antes de usar Stitch MCP:

1. ¿La pantalla ya existe en el proyecto?
2. ¿Puedo editar una pantalla existente en lugar de regenerarla?
3. ¿Estoy respetando el design system actual?
4. ¿Estoy evitando crear patrones visuales paralelos?
5. ¿La salida será normalizada antes de integrarse?
6. ¿La generación aporta valor real o solo ruido visual?
7. ¿Estoy reutilizando componentes reales del sistema?
8. ¿La pantalla seguirá alineada al resto del producto?
   </self_check>

<!-- ── FILOSOFÍA ── -->

<philosophy>

[P1] Reutilizar antes de crear.

[P2] Stitch acelera diseño visual,
NO reemplaza:

- arquitectura frontend
- ingeniería UI
- decisiones sistémicas

[P3] Las pantallas generadas
son borradores visuales,
NO implementación final.

[P4] Consistencia global
tiene prioridad sobre creatividad aislada.

[P5] Iterar > regenerar.

[P6] El design system real del proyecto
siempre tiene prioridad sobre Stitch.

[P7] Stitch debe adaptarse al sistema existente,
NO redefinirlo.

[P8] La intención visual importa más
que preservar el código exacto generado.

[P9] Una pantalla debe sentirse parte natural
del producto completo.

</philosophy>

<!-- ── JERARQUÍA DEL SISTEMA ── -->

<system_hierarchy>

[SH1] shadcn/ui es la autoridad visual principal.

[SH2] globals.css, Tailwind tokens
y primitives del proyecto
son la fuente de verdad visual.

[SH3] Stitch NO puede:

- redefinir branding
- crear design systems paralelos
- introducir escalas inconsistentes
- imponer patrones externos

[SH4] Todo output generado
DEBE alinearse con:

- spacing scale
- typography
- colors
- shadows
- radius
- variants
- accessibility
  del proyecto real.

[SH5] Stitch complementa el sistema existente,
NO lo reemplaza.

[SH6] La arquitectura UI real
siempre tiene prioridad
sobre decisiones visuales generadas.

</system_hierarchy>

<!-- ── HERRAMIENTAS DISPONIBLES ── -->

<tools>

[T1] get_projectlist_projects:
usar SIEMPRE antes de crear proyectos.

[T2] create_project:
usar solo cuando el proyecto no exista.

[T3] list_screens:
usar antes de generar nuevas pantallas.

[T4] get_screen:
usar para revisar contexto existente.

[T5] generate_screen_from_text:
usar para:

- nuevas vistas
- exploración UX
- prototipos visuales

NO como implementación final.

[T6] edit_screens:
preferir para:

- cambios pequeños
- refinamientos
- iteraciones
- mejoras específicas

[T7] generate_variants:
usar para explorar alternativas visuales.

[T8] list_design_systems:
usar antes de crear uno nuevo.

[T9] create_design_system:
usar SOLO si el proyecto NO tiene uno.

[T10] apply_design_system:
alinear siempre al sistema oficial del proyecto.

[T11] update_design_system:
usar cuidadosamente evaluando impacto global.

</tools>

<!-- ── FLUJO CORRECTO ── -->

<workflow>

[W1] Revisar antes de crear:
usar:

- get_projectlist_projects
- list_screens
  antes de generar contenido nuevo.

[W2] Reutilizar antes de regenerar.

[W3] Preferir:
edit_screens
sobre recrear pantallas completas.

[W4] Exploration First:
usar generate_variants
antes de comprometer dirección visual.

[W5] Generación:
debe enfocarse en:

- layout
- jerarquía
- UX
- composición visual

NO implementación final exacta.

[W6] Revisión Manual:
OBLIGATORIA antes de integrar.

[W7] Normalización:
OBLIGATORIA antes de producción.

[W8] El flujo correcto SIEMPRE es:

Exploración
→ Generación
→ Refinamiento
→ Refactorización
→ Normalización
→ Integración

</workflow>

<!-- ── DESIGN SYSTEM ── -->

<design_system>

[DS1] Un proyecto debe tener
UN sistema visual principal.

[DS2] PROHIBIDO:
mezclar múltiples design systems.

[DS3] Stitch debe alinearse
al sistema existente,
NO reemplazarlo.

[DS4] Si ya existe:

- shadcn/ui
- Tailwind tokens
- globals.css

entonces Stitch DEBE reutilizarlos.

[DS5] create_design_system:
SOLO permitido
si realmente no existe uno previo.

[DS6] update_design_system:
debe evaluar impacto global
antes de aplicarse.

[DS7] Todo cambio visual sistémico:
debe documentarse.

[DS8] apply_design_system:
debe mantener:

- consistencia
- accesibilidad
- escalabilidad

</design_system>

<!-- ── GENERACIÓN DE PANTALLAS ── -->

<screens>

[SC1] Toda descripción de pantalla
debe incluir:

- layout
- jerarquía
- componentes esperados
- estados UI
- comportamiento responsive

[SC2] Definir claramente:

- propósito
- flujo UX
- prioridad visual
- interacción esperada

[SC3] Evitar prompts vagos.

[SC4] Las pantallas deben generarse
pensando en:

- reutilización
- composición
- mantenibilidad

[SC5] El resultado debe mapearse
a componentes reales del sistema.

[SC6] Toda pantalla debe validarse contra:

- design system
- accessibility
- UX consistency
- arquitectura frontend

[SC7] Las pantallas NO deben:

- introducir patrones únicos innecesarios
- romper consistencia global
- crear componentes irreutilizables

</screens>

<!-- ── FILTRO DE INTEGRACIÓN ── -->

<integration_filter>

[IF1] Toda pantalla generada
es:
"BORRADOR VISUAL"

NO implementación final.

[IF2] Todo output generado
es DEUDA TÉCNICA
hasta ser normalizado.

[IF3] Reemplazar UI custom por:

- Button
- Card
- Input
- Dialog
- Tabs
- Sheet
- Select
  etc.

desde @/components/ui/

[IF4] Reemplazar:

- hex colors
- estilos inline
- valores arbitrarios
- spacing inconsistente

por:

- design tokens
- semantic colors
- Tailwind scale oficial

[IF5] Eliminar:

- wrappers innecesarios
- clases redundantes
- estilos repetidos
- estructuras artificiales

[IF6] Normalizar:

- spacing
- typography
- shadows
- radius
- states
- transitions

según el sistema oficial.

[IF7] El objetivo es preservar:

- intención visual
- UX
- jerarquía
- layout

NO el código generado literal.

[IF8] La pantalla final
debe parecer diseñada
dentro del sistema real del proyecto.

</integration_filter>

<!-- ── INTEGRACIÓN CON EL PROYECTO ── -->

<integration>

[IN1] Stitch genera estructura visual,
NO arquitectura de negocio.

[IN2] PROHIBIDO:
usar Stitch para:

- lógica de negocio
- estructura de datos
- fetching
- auth
- state management

[IN3] Toda pantalla debe adaptarse a:

- App Router
- SSR-first
- Server-first
- RSC-first

[IN4] Client Components:
solo donde realmente sean necesarios.

[IN5] PROHIBIDO:
sobrehidratar pantallas generadas.

[IN6] Mantener separación clara entre:

- UI
- lógica
- estado
- fetching

[IN7] Integrar usando componentes reales existentes.

</integration>

<!-- ── CALIDAD Y ESCALABILIDAD ── -->

<quality>

[Q1] Las pantallas deben ser:

- mantenibles
- reutilizables
- limpias
- consistentes

[Q2] Eliminar:

- dead code
- imports innecesarios
- estilos redundantes
- estructuras duplicadas

[Q3] Mantener:

- responsive behavior
- accessibility
- dark mode
- variants

[Q4] Evitar:

- layouts rígidos
- componentes gigantes
- patrones irreutilizables

[Q5] El resultado final
debe cumplir estándares reales de producción.

</quality>

<!-- ── ACCESIBILIDAD ── -->

<accessibility>

[AC1] Toda pantalla debe cumplir WCAG.

[AC2] Mantener:

- semantic HTML
- keyboard navigation
- focus states
- labels
- aria attributes

[AC3] PROHIBIDO:
priorizar estética
sobre accesibilidad.

[AC4] Estados visuales obligatorios:

- hover
- focus
- active
- disabled
- loading
- empty
- error

</accessibility>

<!-- ── RESPONSABILIDAD DEL AGENTE ── -->

<agent_behavior>

[AB1] El agente PUEDE:

- explorar layouts
- proponer variantes
- generar scaffolding visual
- iterar UX

[AB2] El agente DEBE:

- validar consistencia
- detectar deuda técnica
- normalizar output
- mapear hacia shadcn/ui

[AB3] El agente DEBE priorizar:

- consistencia
- mantenibilidad
- reutilización
  sobre velocidad de generación.

[AB4] El agente NO debe:
integrar pantallas generadas
sin refactorización.

[AB5] El agente NO debe:
permitir que Stitch redefina
el sistema visual del proyecto.

</agent_behavior>

<!-- ── EFICIENCIA DEL FLUJO ── -->

<efficiency>

[EF1] Evitar regeneraciones completas innecesarias.

[EF2] Preferir iteraciones pequeñas.

[EF3] Reutilizar pantallas y patrones existentes.

[EF4] Minimizar retrabajo mediante revisión temprana.

[EF5] Mantener coherencia visual
a largo plazo.

</efficiency>

<!-- ── PROHIBICIONES CRÍTICAS ── -->

<forbidden>

[F1] PROHIBIDO:
crear proyectos duplicados.

[F2] PROHIBIDO:
crear design systems paralelos.

[F3] PROHIBIDO:
mezclar múltiples design systems.

[F4] PROHIBIDO:
copiar output generado directamente a producción.

[F5] PROHIBIDO:
integrar pantallas sin normalización.

[F6] PROHIBIDO:
usar estilos inline inconsistentes.

[F7] PROHIBIDO:
usar colores hardcodeados.

[F8] PROHIBIDO:
romper tokens del proyecto.

[F9] PROHIBIDO:
introducir patrones visuales incompatibles.

[F10] PROHIBIDO:
usar Stitch para lógica de negocio.

[F11] PROHIBIDO:
sobrehidratar pantallas generadas.

[F12] PROHIBIDO:
preservar código generado
por encima de calidad arquitectónica.

[F13] PROHIBIDO:
ignorar accesibilidad.

[F14] PROHIBIDO:
permitir que Stitch defina
la dirección visual del producto.

</forbidden>

</RULE>
