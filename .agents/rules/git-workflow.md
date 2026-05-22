---
trigger: manual
---

<RULE id="workspace_git_workflow_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = historial de código inconsistente, pérdida de trazabilidad y riesgo operativo.
</core_enforcement>

<self_check>
Antes de cualquier operación en Git:

1. ¿El commit sigue Conventional Commits correctamente?
2. ¿Estoy trabajando en la branch correcta?
3. ¿El cambio está aislado y bien definido?
4. ¿Estoy evitando subir archivos sensibles?
5. ¿El historial quedará limpio y entendible?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>

[P1] Historial como documentación:
El historial de Git debe contar la historia del proyecto.

[P2] Cambios pequeños:
Commits y PRs pequeños son más seguros y fáciles de revisar.

[P3] Trazabilidad:
Cada cambio debe poder rastrearse a una intención clara.

[P4] Consistencia:
Todos los desarrolladores siguen las mismas convenciones.

[P5] Seguridad:
Nunca exponer secretos ni información sensible en el repositorio.

</philosophy>

<!-- ── COMMITS ── -->
<commits>

[C1] Formato obligatorio:
type(scope): descripción en imperativo, minúsculas, sin punto final

[C2] Types permitidos:
feat → nueva funcionalidad
fix → corrección de bug
refactor → cambio sin alterar comportamiento
test → cambios en tests
docs → documentación
chore → mantenimiento
perf → rendimiento
ci → CI/CD

[C3] Scope:
Nombre del dominio o módulo afectado.

[C4] Descripción:
Qué hace el cambio, no cómo.

[C5] Body:
Explica el por qué cuando no es obvio.

[C6] Breaking change:
Footer obligatorio:
BREAKING CHANGE: descripción del impacto

[C7] Atomicidad:
Un commit = un cambio lógico.

[C8] Claridad:
El commit debe entenderse sin leer el código.

</commits>

<!-- ── BRANCHES ── -->
<branches>

[B1] Naming:
type/short-description (kebab-case)

[B2] Base:
main o develop según estrategia.
PROHIBIDO trabajar directo en main.

[B3] Vida:
Corta (ideal < 3 días).

[B4] Enfoque:
Una branch = una feature o fix.

[B5] Sincronización:
Rebase sobre la base antes del PR.

[B6] Historia:
PROHIBIDO merges innecesarios desde main hacia feature branches.

[B7] Limpieza:
Eliminar branches después del merge.

</branches>

<!-- ── PULL REQUESTS ── -->

<pull_requests>

[PR1] Título:
Mismo formato que commit.

[PR2] Descripción obligatoria: - Qué se hizo - Por qué - Cómo probarlo

[PR3] Evidencia:
Screenshots/videos para cambios visuales.

[PR4] Checklist mínimo: - Tests pasando - Lint limpio - Build correcto - Migraciones incluidas si aplica

[PR5] Tamaño:
PRs pequeños (<400 líneas ideal).

[PR6] Estado:
WIP debe estar etiquetado explícitamente.

[PR7] Revisión:
Ningún PR se mergea sin revisión.

</pull_requests>

<!-- ── ESTRATEGIA DE MERGE ── -->

<merge_strategy>

[M1] Feature branches:
Squash merge.

[M2] Releases:
Merge commit permitido.

[M3] Historia:
Mantener historia limpia y lineal.

[M4] Force push:
PROHIBIDO en branches compartidas.

[M5] Uso permitido:
Force push solo en branches personales antes del PR.

</merge_strategy>

<!-- ── SEGURIDAD EN GIT ── -->
<security>

[S1] Archivos sensibles:
Nunca commitear: - .env - credenciales - tokens - llaves privadas

[S2] Validación:
Revisar diff antes de commit.

[S3] .gitignore:
Debe cubrir archivos sensibles y de build.

[S4] Escaneo:
Detectar secrets antes de push.

</security>

<!-- ── RESPONSABILIDAD DEL AGENTE ── -->

<agent_behavior>

[A1] Puede: - Sugerir commits - Generar mensajes - Documentar PRs

[A2] No puede: - Hacer commits automáticos - Hacer push sin autorización

[A3] Debe:
Alertar sobre archivos sensibles.

[A4] Operaciones críticas:
reset, rebase, force push:
requieren explicación + aprobación.

</agent_behavior>

<!-- ── CALIDAD DEL HISTORIAL ── -->

<history_quality>

[H1] Legibilidad:
Historial entendible sin contexto externo.

[H2] Agrupación:
Cambios relacionados en commits coherentes.

[H3] Limpieza:
Evitar commits ruidosos o redundantes.

[H4] Reescritura:
Permitida solo antes de PR (rebase interactivo).

</history_quality>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO commitear archivos sensibles.

[F2] PROHIBIDO usar git add . sin revisar cambios.

[F3] PROHIBIDO commits genéricos:
"fix", "update", "changes", "wip".

[F4] PROHIBIDO mergear con CI fallando.

[F5] PROHIBIDO reescribir historia en branches compartidas.

[F6] PROHIBIDO PRs gigantes sin dividir.

[F7] PROHIBIDO trabajar directo en main.

</forbidden>

</RULE>
