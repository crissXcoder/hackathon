---
trigger: manual
---

<RULE id="workspace_magic_mcp_v3" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.

Magic MCP es una herramienta de:

- aceleración UI
- exploración visual
- inspiración
- scaffolding

NO es:

- autoridad visual
- design system
- arquitecto frontend
- reemplazo de ingeniería humana

Todo output generado debe alinearse obligatoriamente
con:

- shadcn/ui
- design tokens
- arquitectura Next.js
- sistema visual del proyecto

Violarlas =:

- deuda técnica
- UI inconsistente
- fragmentación visual
- código no mantenible
- sobreingeniería innecesaria
  </core_enforcement>

<!-- ── SELF CHECK ── -->

<self_check>
Antes de usar Magic MCP:

1. ¿Esto realmente requiere generación UI?
2. ¿Ya existe un componente reutilizable en el proyecto?
3. ¿Necesito inspiración o implementación real?
4. ¿Estoy respetando el design system existente?
5. ¿El output será normalizado antes de integrarse?
6. ¿Estoy evitando regeneraciones innecesarias?
7. ¿El componente será construido con primitives shadcn?
8. ¿Estoy evitando crear deuda técnica visual?
   </self_check>

<!-- ── FILOSOFÍA ── -->

<philosophy>

[P1] Generación asistida,
NO generación autónoma.

[P2] Magic acelera UI,
pero NO reemplaza:

- arquitectura
- ingeniería
- accesibilidad
- diseño sistémico

[P3] El código generado es:
materia prima visual,
NO producto final.

[P4] Inspiración > copia directa.

[P5] Refinar > regenerar.

[P6] El design system del proyecto
tiene prioridad absoluta
sobre cualquier output generado.

[P7] Magic debe adaptarse al proyecto,
NO el proyecto adaptarse a Magic.

[P8] La intención visual importa más
que preservar el código exacto generado.

[P9] La calidad final del componente
debe ser equivalente
a código escrito manualmente.

</philosophy>

<!-- ── JERARQUÍA DEL SISTEMA ── -->

<system_hierarchy>

[SH1] shadcn/ui es la autoridad visual principal.

[SH2] globals.css y design tokens
son la fuente de verdad visual.

[SH3] Magic MCP:
NO puede introducir:

- sistemas visuales paralelos
- patrones inconsistentes
- tokens alternativos
- estilos arbitrarios

[SH4] Todo output generado
DEBE alinearse con:

- spacing scale
- typography
- radius
- shadows
- variants
- accessibility
  del proyecto.

[SH5] Magic NO define:

- branding
- theming
- design direction
- arquitectura UI

[SH6] Magic complementa el sistema,
NO lo reemplaza.

</system_hierarchy>

<!-- ── HERRAMIENTAS DISPONIBLES ── -->

<tools>

[T1] 21st_magic_component_inspiration:
usar para:

- explorar ideas
- referencias visuales
- variantes UX
- inspiración temprana

[T2] 21st_magic_component_builder:
usar para:

- scaffolding rápido
- prototipos UI
- estructuras iniciales

[T3] 21st_magic_component_refiner:
usar para:

- iteraciones pequeñas
- mejoras específicas
- refinamientos visuales

[T4] logo_search:
usar únicamente para:

- logos oficiales
- assets de marca autorizados

</tools>

<!-- ── FLUJO CORRECTO ── -->

<workflow>

[W1] Inspiration First:
usar inspiration antes de builder
cuando:

- no existe dirección visual clara
- el componente es complejo
- se exploran variantes UX

[W2] Builder:
generar únicamente:

- estructura base
- intención visual
- layout inicial

NO código final de producción.

[W3] Refiner:
preferir refinamiento incremental
sobre regeneración completa.

[W4] Revisión Manual:
OBLIGATORIA antes de integrar.

[W5] Normalización:
OBLIGATORIA antes de producción.

[W6] Integración:
solo después de:

- refactor
- limpieza
- adaptación al design system

[W7] El flujo correcto SIEMPRE es:

Inspiración
→ Generación
→ Refactorización
→ Normalización
→ Integración

</workflow>

<!-- ── FILTRO DE INTEGRACIÓN ── -->

<integration_filter>

[IF1] Todo output generado
se considera:
"DEUDA TÉCNICA TEMPORAL"
hasta ser normalizado.

[IF2] Reemplazar componentes custom por:

- Button
- Input
- Card
- Dialog
- Sheet
- Tabs
- Select
- Badge
  etc.

desde @/components/ui/

[IF3] Reemplazar:

- hex colors
- rgb()
- hsl()
- inline colors

por:

- tokens Tailwind
- CSS variables
- semantic colors

[IF4] Eliminar:

- wrappers innecesarios
- clases redundantes
- Tailwind arbitrario excesivo
- estilos duplicados

[IF5] Normalizar:

- spacing
- radius
- typography
- shadows
- transitions
- states

según el design system real.

[IF6] PROHIBIDO:
preservar código generado
si contradice:

- mantenibilidad
- consistencia
- arquitectura
- accesibilidad

[IF7] El objetivo es preservar:

- UX
- intención visual
- jerarquía
- layout

NO el código literal.

[IF8] El componente final
debe parecer parte natural
del sistema existente.

</integration_filter>

<!-- ── CALIDAD DEL OUTPUT ── -->

<output_quality>

[OQ1] Todo output debe ser:

- limpio
- legible
- reutilizable
- mantenible
- tipado

[OQ2] Eliminar:

- dead code
- props innecesarias
- estados redundantes
- imports no usados

[OQ3] Componentes:
deben soportar:

- variants
- dark mode
- responsive layouts
- accessibility

[OQ4] Evitar:

- componentes gigantes
- lógica mezclada
- acoplamiento innecesario

[OQ5] Mantener separación clara entre:

- UI
- lógica
- estado
- fetching

[OQ6] El resultado final
debe cumplir estándares de producción reales.

</output_quality>

<!-- ── TIPADO Y ARQUITECTURA ── -->

<architecture>

[A1] Tipado estricto:
OBLIGATORIO.

[A2] PROHIBIDO:
usar any.

[A3] UI generada:
NO debe contener lógica de negocio.

[A4] PROHIBIDO:
fetching dentro de componentes visuales generados.

[A5] Mantener compatibilidad con:

- Next.js App Router
- Server-first
- SSR-first
- RSC-first

[A6] Client Components:
solo cuando realmente sean necesarios.

[A7] PROHIBIDO:
sobrehidratar UI generada innecesariamente.

</architecture>

<!-- ── TOKENS Y ESTILOS ── -->

<styles>

[S1] Usar exclusivamente:

- design tokens
- semantic colors
- Tailwind scale oficial

[S2] PROHIBIDO:
colores hardcodeados en producción.

[S3] PROHIBIDO:
spacing arbitrario innecesario.

[S4] PROHIBIDO:
inline styles decorativos.

[S5] Shadows, radius y typography
deben alinearse
con el sistema existente.

[S6] Mantener consistencia visual global.

</styles>

<!-- ── ACCESIBILIDAD ── -->

<accessibility>

[AC1] Todo componente generado
debe cumplir WCAG.

[AC2] Mantener:

- labels
- roles
- keyboard navigation
- focus states
- aria attributes

[AC3] PROHIBIDO:
romper accesibilidad
por priorizar estética.

[AC4] Estados visuales obligatorios:

- hover
- focus
- active
- disabled
- loading

</accessibility>

<!-- ── RESPONSABILIDAD DEL AGENTE ── -->

<agent_behavior>

[AB1] El agente PUEDE:

- sugerir prompts
- proponer variantes
- generar scaffolding
- explorar ideas visuales

[AB2] El agente DEBE:

- advertir inconsistencias
- detectar deuda técnica
- normalizar output
- mapear hacia shadcn/ui

[AB3] El agente DEBE priorizar:

- consistencia
- mantenibilidad
- accesibilidad
  sobre velocidad de generación.

[AB4] El agente NO debe:
integrar output generado
sin revisión manual.

[AB5] El agente NO debe:
permitir que Magic defina
la arquitectura UI del proyecto.

</agent_behavior>

<!-- ── LOGOS Y BRANDING ── -->

<logos>

[L1] Usar únicamente logos oficiales.

[L2] Preferir SVG optimizado.

[L3] Verificar licencias antes de producción.

[L4] PROHIBIDO:
modificar branding sin autorización.

</logos>

<!-- ── PROHIBICIONES CRÍTICAS ── -->

<forbidden>

[F1] PROHIBIDO:
usar Magic MCP para lógica de negocio.

[F2] PROHIBIDO:
copiar output generado directamente a producción.

[F3] PROHIBIDO:
integrar componentes sin normalización.

[F4] PROHIBIDO:
introducir design systems paralelos.

[F5] PROHIBIDO:
usar colores hardcodeados.

[F6] PROHIBIDO:
romper tokens del proyecto.

[F7] PROHIBIDO:
introducir librerías UI nuevas
sin análisis previo.

[F8] PROHIBIDO:
regenerar componentes completos innecesariamente.

[F9] PROHIBIDO:
preservar código generado
por encima de calidad arquitectónica.

[F10] PROHIBIDO:
ignorar accesibilidad.

[F11] PROHIBIDO:
crear componentes inconsistentes
con el resto del proyecto.

[F12] PROHIBIDO:
depender ciegamente del output generado.

</forbidden>

</RULE>
