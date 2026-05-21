---
trigger: glob
globs: **/*.ts, **/*.tsx, next.config.*
---

<RULE id="workspace_next_v3" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.

El objetivo principal es mantener:

- Server-first
- RSC-first
- SSR-first

sin sacrificar:

- SEO
- performance
- caché
- streaming
- accesibilidad
- progressive enhancement

Las animaciones NO deben romper la arquitectura de Next.js App Router.
</core_enforcement>

<!-- ── SELF CHECK ── -->

<self_check>
Antes de implementar cualquier feature en Next.js:

1. ¿Esto puede resolverse como Server Component?
2. ¿Estoy moviendo lógica innecesariamente al cliente?
3. ¿Estoy rompiendo el modelo de caché de Next?
4. ¿Estoy agregando JavaScript que no aporta valor real?
5. ¿La UI sigue funcionando si el JS falla o carga lento?
6. ¿La animación está aislada en un Client Wrapper pequeño?
7. ¿Estoy preservando SSR y SEO?
   </self_check>

<!-- ── FILOSOFÍA ── -->

<philosophy>

[P1] Server-first por defecto.
Todo inicia en el servidor.

[P2] RSC-first.
React Server Components son la base arquitectónica.

[P3] SSR-first.
La UI debe renderizar HTML útil y completo desde el servidor.

[P4] El cliente es enriquecimiento progresivo,
NO la arquitectura principal.

[P5] Menos JavaScript en el browser = mejor performance.

[P6] Data fetching vive en el servidor.

[P7] Las animaciones son enhancement visual,
NO requisito funcional.

[P8] Si JavaScript falla:
el contenido debe seguir siendo:

- visible
- legible
- navegable
- accesible

[P9] SEO, caché y streaming tienen prioridad sobre efectos visuales.

</philosophy>

<!-- ── ARQUITECTURA APP ROUTER ── -->

<architecture>

[A1] Server Components:
por defecto en toda la aplicación.

[A2] "use client":
SOLO cuando sea estrictamente necesario:

- interactividad
- browser APIs
- event listeners
- animaciones runtime
- refs
- hooks cliente

[A3] "use client":
SIEMPRE al tope del archivo,
antes de imports.

[A4] PROHIBIDO:
convertir páginas completas a Client Components
solo para animaciones.

[A5] Animation Bridge — OBLIGATORIO:
las animaciones deben aislarse en pequeños Client Wrappers.

Patrón correcto:

- Page/layout → Server Component
- Data fetching → Server
- SEO → Server
- Metadata → Server
- Animación → Client Wrapper aislado

[A6] Los datos SIEMPRE deben originarse desde Server Components
y pasar al cliente mediante props serializables.

[A7] PROHIBIDO:
mover fetching al cliente únicamente para animar.

[A8] Layouts:
datos compartidos viven en layouts.

[A9] PROHIBIDO:
refetch de datos en pages hijas
si ya existen en layout.

[A10] PROHIBIDO:
mezclar App Router con Pages Router.

[A11] Client Islands:
deben ser pequeñas, aisladas y enfocadas.

[A12] Minimizar hydration:
hidratar SOLO lo necesario.

[A13] Progressive Enhancement:
la UI base debe funcionar antes de hydration.

</architecture>

<!-- ── FETCHING Y CACHÉ ── -->

<data_fetching>

[F1] Fetch en Server Components:
SIEMPRE definir estrategia:

- cache
- revalidate
- tags

[F2] PROHIBIDO:
fetch sin política de caché.

[F3] Data fetching:
SIEMPRE en servidor cuando sea posible.

[F4] Mutaciones:
usar Server Actions.

[F5] Invalidación:
usar:

- revalidatePath
- revalidateTag

[F6] PROHIBIDO:
invalidar caché desde el cliente.

[F7] unstable_cache:
para queries costosas.

[F8] Tags:
OBLIGATORIAS para invalidación consistente.

[F9] PROHIBIDO:
getServerSideProps en App Router.

[F10] PROHIBIDO:
getStaticProps en App Router.

[F11] Streaming:
preservarlo siempre que sea posible.

[F12] PROHIBIDO:
bloquear rendering por lógica cliente innecesaria.

</data_fetching>

<!-- ── ANIMATION BRIDGE ── -->

<animation_bridge>

[AB1] Las animaciones NO justifican convertir
una página completa en Client Component.

[AB2] Toda animación debe vivir dentro
de un Client Wrapper aislado.

Ejemplo correcto:

- HeroContent → Server Component
- HeroAnimation → Client Component

[AB3] El HTML importante para SEO
debe renderizarse SIEMPRE desde el servidor.

[AB4] PROHIBIDO:
ocultar contenido crítico esperando hydration.

[AB5] El contenido debe ser visible
antes de que GSAP o cualquier JS cargue.

[AB6] PROHIBIDO:
usar CSS base con:

- opacity: 0
- visibility: hidden

si depende de JS para hacerse visible.

[AB7] Las animaciones deben mejorar la UI,
NO sostenerla.

[AB8] El estado inicial SSR debe ser estable,
visible y accesible.

[AB9] PROHIBIDO:
hydration mismatch por animaciones.

[AB10] Las animaciones NO deben alterar:

- estructura SSR
- semántica HTML
- accesibilidad base

[AB11] SplitText o manipulaciones agresivas de DOM:
SOLO post-hydration
y en wrappers aislados.

[AB12] Preferir reveal progresivo
sobre contenido inicialmente oculto.

</animation_bridge>

<!-- ── CLIENT COMPONENTS ── -->

<client_components>

[C1] Client Components:
solo para:

- interacción
- estado local
- animaciones
- browser APIs

[C2] PROHIBIDO:
mover lógica de negocio al cliente.

[C3] PROHIBIDO:
mover validaciones críticas al cliente.

[C4] PROHIBIDO:
hidratar árboles completos innecesariamente.

[C5] Mantener Client Components:

- pequeños
- reutilizables
- aislados

[C6] El cliente NO debe duplicar
lógica ya resuelta en servidor.

</client_components>

<!-- ── RUTAS Y NAVEGACIÓN ── -->

<routing>

[R1] Params dinámicos:
tipado obligatorio.

[R2] Next 15+:
tratar SIEMPRE params y searchParams como Promises (await) en componentes de nivel superior.

[R3] PROHIBIDO:
asumir tipos sin validación.

[R4] redirect() y notFound():
importar desde next/navigation.

[R5] PROHIBIDO:
usar next/router.

[R6] Navegación interna:
usar SIEMPRE <Link> de next/link.

[R7] PROHIBIDO:
usar <a> para navegación interna.

[R8] Middleware:
SOLO para:

- auth
- redirects
- headers

[R9] PROHIBIDO:
lógica de negocio en middleware.

</routing>

<!-- ── IMÁGENES Y ASSETS ── -->

<images>

[I1] Imágenes:
usar SIEMPRE <Image> de next/image.

[I2] PROHIBIDO:
usar <img> nativo
excepto SVG inline.

[I3] LCP:
usar priority en imágenes above-the-fold.

[I4] Definir:

- width/height
  o
- fill con contenedor relativo.

[I5] Optimizar imágenes
antes de animarlas.

[I6] PROHIBIDO:
animaciones que degraden LCP.

</images>

<!-- ── SERVER ACTIONS ── -->

<server_actions>

[SA1] Declaración:
usar "use server".

[SA2] Ubicación:
al tope del archivo o función.

[SA3] Validación:
usar DTOs y validación robusta.

[SA4] PROHIBIDO:
confiar en datos cliente.

[SA5] Retorno tipado obligatorio:

{ success: true, data }

{ success: false, error }

[SA6] PROHIBIDO:
lanzar excepciones crudas al cliente.

</server_actions>

<!-- ── PERFORMANCE ── -->

<performance>

[P1] Minimizar JavaScript enviado al browser.

[P2] dynamic():
usar { ssr: false }
SOLO para browser APIs reales.

[P3] Las animaciones NO justifican
deshabilitar SSR de páginas completas.

[P4] next/font:
OBLIGATORIO para fuentes.

[P5] PROHIBIDO:
fuentes desde CDN externo.

[P6] Metadata:
usar generateMetadata
en páginas relevantes para SEO.

[P7] PROHIBIDO:
páginas importantes sin metadata.

[P8] Evitar hydration innecesaria.

[P9] Evitar waterfalls cliente.

[P10] Priorizar:

- streaming
- caché
- SSR
  sobre efectos visuales.

[P11] Cada Client Component
agrega costo de hydration.
Usarlos estratégicamente.

[P12] Progressive enhancement
SIEMPRE sobre dependencia total de JS.

</performance>

<!-- ── SEO ── -->

<seo>

[S1] El contenido importante debe existir en SSR.

[S2] PROHIBIDO:
renderizar contenido SEO-critical
solo en cliente.

[S3] Headings, texto principal y metadata:
SIEMPRE desde servidor.

[S4] Las animaciones NO deben ocultar
contenido crítico a crawlers.

[S5] Mantener:

- semantic HTML
- accessibility
- crawlability

durante animaciones.

</seo>

<!-- ── ACCESIBILIDAD ── -->

<accessibility>

[AC1] La UI debe ser usable sin JS.

[AC2] Respetar prefers-reduced-motion.

[AC3] PROHIBIDO:
usar motion como único feedback de estado.

[AC4] Mantener focus states accesibles.

[AC5] Las animaciones NO deben impedir:

- lectura
- navegación
- interacción

[AC6] Contenido oculto visualmente
debe manejarse correctamente para screen readers.

</accessibility>

<!-- ── PROHIBICIONES CRÍTICAS ── -->

<forbidden>

[F1] PROHIBIDO:
convertir páginas completas a Client Components
solo para animaciones.

[F2] PROHIBIDO:
fetch en Client Components
si puede resolverse en servidor.

[F3] PROHIBIDO:
romper el modelo de caché de Next.js.

[F4] PROHIBIDO:
mover lógica de negocio al cliente.

[F5] PROHIBIDO:
usar next/router.

[F6] PROHIBIDO:
mezclar Pages Router y App Router.

[F7] PROHIBIDO:
ocultar contenido SSR esperando hydration.

[F8] PROHIBIDO:
sobrehidratar la aplicación.

[F9] PROHIBIDO:
usar JS como dependencia obligatoria
para mostrar contenido principal.

[F10] PROHIBIDO:
sacrificar SEO o SSR
por efectos visuales.

</forbidden>

</RULE>
