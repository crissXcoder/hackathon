---
trigger: model_decision
description: Activar cuando la tarea mencione componentes de /components/ui, formularios, dialogs, toasts, o imports de shadcn. No cargar en componentes custom o utilitarios que no dependan de la librería.
---

<RULE id="workspace_shadcn_ui_v3" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.

shadcn/ui es:

- la base del design system
- la autoridad visual principal
- la fuente de verdad de componentes UI

Todo componente externo o generado
(Magic MCP, Stitch, templates, AI, etc.)
DEBE adaptarse al sistema shadcn existente.

Violarlas =:

- inconsistencia visual
- deuda técnica
- fragmentación del design system
- pérdida de mantenibilidad
- duplicación de patrones UI
  </core_enforcement>

<!-- ── SELF CHECK ── -->

<self_check>
Antes de instalar, crear o integrar un componente:

1. ¿El componente ya existe en /components/ui/?
2. ¿Puedo resolver esto componiendo componentes existentes?
3. ¿Estoy respetando tokens y spacing del sistema?
4. ¿Estoy evitando colores hardcodeados?
5. ¿Estoy evitando estilos inline innecesarios?
6. ¿El componente generado fue normalizado antes de integrarse?
7. ¿Estoy reutilizando el design system en lugar de crear uno paralelo?
8. ¿La solución sigue siendo consistente con el resto del proyecto?
   </self_check>

<!-- ── FILOSOFÍA ── -->

<philosophy>

[P1] shadcn/ui es infraestructura visual,
NO UI final cerrada.

[P2] Composición sobre modificación.
La personalización ocurre:

- mediante wrappers
- variants
- composición
- extensión controlada

NO modificando el core.

[P3] Consistencia visual > creatividad aislada.

[P4] El design system tiene prioridad
sobre decisiones visuales individuales.

[P5] Reutilización > duplicación.

[P6] Todo componente generado externamente
es materia prima,
NO código final de producción.

[P7] Magic MCP y Stitch:
aceleran diseño,
pero NO reemplazan:

- arquitectura UI
- design system
- criterios de ingeniería

[P8] El proyecto debe sentirse
como UN solo sistema visual.

[P9] Tokens primero.
Los estilos deben derivar del sistema,
NO de decisiones arbitrarias.

</philosophy>

<!-- ── AUTORIDAD DEL DESIGN SYSTEM ── -->

<design_system_authority>

[DSA1] shadcn/ui es la autoridad visual principal del proyecto.

[DSA2] Tailwind tokens y globals.css
son la fuente de verdad visual global.

[DSA3] PROHIBIDO:
crear sistemas visuales paralelos.

[DSA4] Magic MCP, Stitch y templates externos:
DEBEN obedecer:

- tokens
- spacing scale
- radius scale
- typography
- variants
- accessibility patterns

del proyecto existente.

[DSA5] Todo componente nuevo
debe integrarse al sistema existente,
NO competir con él.

[DSA6] El design system debe permanecer:

- coherente
- predecible
- reutilizable
- escalable

</design_system_authority>

<!-- ── INSTALACIÓN ── -->

<installation>

[I1] Instalación oficial:
npx shadcn@latest add [component]

[I2] PROHIBIDO:
instalar componentes manualmente desde npm externos
si ya existen en shadcn.

[I3] Antes de instalar:
revisar:

- /components/ui/
- componentes existentes
- wrappers existentes

[I4] PROHIBIDO:
duplicar componentes base.

[I5] Ubicación oficial:
todos los componentes base viven en:
/components/ui/

[I6] Los componentes generados por shadcn
se consideran:
"infraestructura controlada".

[I7] PROHIBIDO: modificar para estilos ad-hoc; PERMITIDO: modificar para mejoras sistémicas de accesibilidad o corrección de bugs globales.

[I8] Actualizaciones del sistema:
deben preservar compatibilidad visual.

</installation>

<!-- ── COMPOSICIÓN Y EXTENSIÓN ── -->

<composition>

[C1] Extender mediante:

- wrappers
- composition
- slots
- variants
- utility components

[C2] PROHIBIDO:
forkear componentes base innecesariamente.

[C3] Variantes:
usar cva().

[C4] VariantProps<typeof variants>:
OBLIGATORIO.

[C5] PROHIBIDO:
usar any en componentes UI.

[C6] Componentes UI:
manejan presentación,
NO lógica de negocio.

[C7] Separar:

- UI
- estado
- lógica
- fetching

[C8] Componentes complejos:
deben construirse combinando primitives existentes.

[C9] Mantener APIs consistentes
entre componentes.

</composition>

<!-- ── TOKENS Y ESTILOS ── -->

<styles>

[S1] Fuente de verdad:

- globals.css
- CSS variables
- tailwind.config
- design tokens

[S2] Colores:
usar exclusivamente:

- primary
- secondary
- muted
- accent
- destructive
- border
- background
- foreground
  etc.

[S3] PROHIBIDO:
hex hardcodeados en producción.

[S4] PROHIBIDO:
rgb(), hsl() o inline colors
fuera del sistema de tokens.

[S5] Espaciado:
usar escala oficial de Tailwind.

[S6] PROHIBIDO:
spacing arbitrario innecesario:
❌ px-[17px]
❌ gap-[13px]

sin justificación real.

[S7] Radius:
usar escala consistente.

[S8] Shadows:
deben seguir el sistema global.

[S9] Typography:
debe seguir:

- font scale
- weights
- tracking
- hierarchy
  del proyecto.

[S10] Dark mode:
debe derivar de variables del sistema.

[S11] PROHIBIDO:
overrides aislados inconsistentes.

[S12] Un cambio visual global
debe poder propagarse fácilmente.

</styles>

<!-- ── INTEGRACIÓN DE MAGIC MCP Y STITCH ── -->

<generated_ui_integration>

[GI1] Todo output generado
(Magic MCP, Stitch, AI, templates)
se considera:
"borrador visual".

NO código final.

[GI2] Todo componente generado
es DEUDA TÉCNICA
hasta ser normalizado.

[GI3] Filtro de Integración — OBLIGATORIO:

Antes de integrar:

1. Reemplazar primitives custom por:

- Button
- Input
- Card
- Dialog
- Sheet
- Tabs
- Select
  etc.

desde @/components/ui/

2. Reemplazar:

- hex colors
- inline colors
- valores arbitrarios

por tokens oficiales.

3. Eliminar:

- clases redundantes
- spacing inconsistente
- estilos innecesarios
- wrappers inútiles

4. Alinear:

- radius
- spacing
- typography
- shadows
- states
  con el design system.

[GI4] PROHIBIDO:
copiar output generado directamente a producción.

[GI5] Todo output generado
debe revisarse manualmente.

[GI6] El objetivo NO es preservar
el código exacto generado,
sino preservar:

- intención visual
- UX
- layout
- jerarquía

alineándolo al sistema real.

[GI7] PROHIBIDO:
integrar componentes generados que:

- usen estilos inline
- usen colores hardcodeados
- ignoren tokens
- rompan spacing scale
- introduzcan patrones inconsistentes

[GI8] Las herramientas generativas:
sirven para:

- inspiración
- scaffolding
- exploración
- aceleración

NO para reemplazar ingeniería UI.

</generated_ui_integration>

<!-- ── PATRONES OFICIALES ── -->

<patterns>

[P1] Forms:
usar:

- shadcn Form
- react-hook-form
- validación tipada

[P2] Dialogs / Sheets:
estado controlado desde el padre.

[P3] Toasts:
usar exclusivamente sonner.

[P4] Layouts:
componer primitives existentes.

[P5] Evitar componentes monolíticos gigantes.

[P6] Reutilizar estructuras comunes
mediante:

- wrappers
- shared components
- abstractions

[P7] Mantener naming consistente.

[P8] Componentes reutilizables:
deben abstraerse en:
/components/

</patterns>

<!-- ── ACCESIBILIDAD ── -->

<accessibility>

[AC1] Preservar atributos ARIA provistos por shadcn.

[AC2] PROHIBIDO:
eliminar:

- labels
- roles
- keyboard navigation
- focus handling

[AC3] Todos los componentes deben soportar:

- keyboard navigation
- focus visible
- screen readers

[AC4] Estados visuales obligatorios:

- hover
- focus
- active
- disabled
- loading

[AC5] Contraste y legibilidad:
deben respetar accesibilidad.

</accessibility>

<!-- ── ESCALABILIDAD ── -->

<scalability>

[SC1] Todo componente debe soportar:

- variants
- tamaños
- theming
- dark mode

sin romper consistencia.

[SC2] Componentes deben ser:

- reutilizables
- tipados
- mantenibles
- predecibles

[SC3] Evitar patrones visuales únicos
sin reutilización potencial.

[SC4] El sistema debe crecer
sin fragmentarse.

</scalability>

<!-- ── RESPONSABILIDAD DEL AGENTE ── -->

<agent_behavior>

[AB1] El agente DEBE priorizar:

- reutilización
- composición
- consistencia
  sobre generación rápida.

[AB2] El agente DEBE advertir
cuando un componente generado:

- rompe tokens
- rompe spacing
- rompe accesibilidad
- introduce deuda técnica

[AB3] El agente NO debe:
integrar output generado
sin normalización previa.

[AB4] El agente DEBE mapear
UI generada hacia primitives shadcn.

</agent_behavior>

<!-- ── PROHIBICIONES CRÍTICAS ── -->

<forbidden>

[F1] PROHIBIDO:
modificar directamente /components/ui/\*

[F2] PROHIBIDO:
crear design systems paralelos.

[F3] PROHIBIDO:
usar colores hardcodeados.

[F4] PROHIBIDO:
usar estilos inline innecesarios.

[F5] PROHIBIDO:
duplicar componentes existentes.

[F6] PROHIBIDO:
mezclar múltiples librerías UI
(MUI, Chakra, Mantine, etc.)

[F7] PROHIBIDO:
integrar output de Magic/Stitch
sin normalización.

[F8] PROHIBIDO:
introducir spacing arbitrario
sin justificación.

[F9] PROHIBIDO:
romper el sistema de tokens.

[F10] PROHIBIDO:
copiar código generado directamente a producción.

[F11] PROHIBIDO:
crear componentes inconsistentes
con el resto del sistema.

[F12] PROHIBIDO:
permitir que herramientas generativas
definan la dirección visual del proyecto.

</forbidden>

</RULE>
