---
trigger: manual
---

<RULE id="workspace_nanobana_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = uso incorrecto del MCP + riesgo de assets de baja calidad o inseguros.
</core_enforcement>

<self_check>
Antes de generar imágenes o subir archivos:

1. ¿El prompt describe claramente estilo, uso y contexto?
2. ¿El asset respeta el design system del proyecto?
3. ¿Estoy evitando contenido sensible o inapropiado?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Generación con intención: cada asset debe tener un propósito claro en el producto.
  [P2] Calidad sobre velocidad: generar rápido sin revisar = deuda visual.
  [P3] Assets como soporte, no reemplazo del diseño oficial.
</philosophy>

<!-- ── HERRAMIENTAS DISPONIBLES ── -->
<tools>

[T1] generate_image:
generar imágenes desde prompt textual estructurado.

[T2] upload_file:
subir archivos al servicio.

[T3] show_output_stats:
consultar estado y métricas del output generado.

[T4] maintenance:
operaciones de mantenimiento del servicio.

</tools>

<!-- ── GENERACIÓN DE IMÁGENES ── -->

<image_generation>

[IG1] Prompt obligatorio:
incluir estilo visual, paleta, composición, iluminación y mood.

[IG2] Contexto:
definir uso exacto: - hero section - background decorativo - ícono de app - og:image - ilustración de feature

[IG3] Precisión:
evitar prompts vagos como "imagen bonita".
usar descripciones concretas y controladas.

[IG4] Coherencia:
respetar design system del proyecto:
colores, branding, tono visual.

[IG5] Validación:
revisar manualmente antes de integrar.

[IG6] Output stats:
usar show_output_stats si hay dudas sobre estado o calidad.

</image_generation>

<!-- ── UPLOAD DE ARCHIVOS ── -->

<file_upload>

[FU1] Validación previa:
solo subir archivos revisados y aprobados.

[FU2] Optimización:
verificar tamaño y formato antes de subir.

[FU3] Formatos recomendados:
imágenes: WebP (preferido), PNG (si transparencia), SVG (logos).

[FU4] Documentación:
registrar en task.md: - nombre del archivo - propósito - ubicación en el proyecto

[FU5] Consistencia:
rutas alineadas con estructura del proyecto.

</file_upload>

<!-- ── INTEGRACIÓN AL PROYECTO ── -->
<integration>

[IN1] Optimización:
comprimir assets antes de integrar.

[IN2] Naming:
nombres descriptivos:
hero-dashboard.webp
icon-user-active.svg

[IN3] Uso:
no usar imágenes como fallback de contenido crítico.

[IN4] Rol:
assets generados son: - apoyo visual - prototipado - placeholders

        NO reemplazan diseño oficial sin aprobación.

[IN5] LCP Protection:
Toda imagen generada que sea el elemento principal (Hero) DEBE usar la prop 'priority' en next/image para optimizar el LCP.

</integration>

<!-- ── MANTENIMIENTO ── -->
<maintenance>

[M1] Uso:
solo bajo instrucción explícita o fallo del sistema.

[M2] Registro:
documentar en walkthrough.md: - acción realizada - motivo - resultado

[M3] Seguridad:
no ejecutar operaciones sin entender su impacto.

</maintenance>

<!-- ── SEGURIDAD Y CONTENIDO ── -->
<safety>

[SF1] Datos sensibles:
PROHIBIDO generar o subir contenido con: - credenciales - tokens - información privada

[SF2] Personas reales:
PROHIBIDO generar imágenes de personas identificables.

[SF3] Contenido:
evitar contenido: - ilegal - ofensivo - inapropiado para el producto

[SF4] Branding:
no usar logos o marcas sin validar licencia.

</safety>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO generar imágenes genéricas sin contexto de uso.

[F2] PROHIBIDO integrar assets sin revisión manual.

[F3] PROHIBIDO subir archivos sin optimización previa.

[F4] PROHIBIDO usar assets generados como finales sin aprobación.

[F5] PROHIBIDO generar imágenes con personas reales identificables.

[F6] PROHIBIDO subir archivos con datos sensibles o secretos.

</forbidden>

</RULE>
