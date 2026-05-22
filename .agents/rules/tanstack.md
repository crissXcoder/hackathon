---
trigger: model_decision
description: Activar cuando la tarea involucre fetching, caché, mutaciones, tablas de datos o formularios TanStack. No cargar en componentes visuales o de layout sin lógica de servidor. Detectar por imports, hooks o vocabulario del prompt.
---

<RULE id="workspace_tanstack_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = desincronización de estado, bugs de cache y comportamiento impredecible en UI.
</core_enforcement>

<self_check>
Antes de implementar lógica con TanStack:

1. ¿Este dato proviene del servidor o del cliente?
2. ¿Estoy usando TanStack Query para manejar server state?
3. ¿Estoy rompiendo la consistencia de cache o duplicando estado?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Separación estricta entre server state y client state.
  [P2] TanStack Query es la fuente de verdad del estado del servidor.
  [P3] Evitar duplicación de estado en toda la aplicación.
  [P4] La cache es parte del modelo de datos, no un detalle de implementación.
</philosophy>

<!-- ── QUERY (SERVER STATE) ── -->
<query>

[Q1] Server state:
Todo estado del servidor va en TanStack Query.
PROHIBIDO usar useState + useEffect para fetching de datos remotos.

[Q2] queryKey:
Definir queryKey como constante tipada exportable.
Ejemplo:
export const QUERY_KEYS = {
users: ['users'] as const
};
Debe ser consistente, reutilizable y predecible.

[Q3] staleTime:
Obligatorio en cada query.
Default mínimo: 1000 \* 60 (1 minuto).
PROHIBIDO usar staleTime: 0 sin justificación explícita.

[Q4] Mutaciones:
Usar useMutation + onSuccess para invalidar queries relacionadas.
La invalidación debe ser explícita y controlada.
PROHIBIDO refetch manual salvo casos críticos y documentados.

[Q5] Manejo de errores:
Usar onError en cada mutation crítica.
PROHIBIDO silenciar errores.
Todo error debe ser manejado y visible para debugging o UX.

</query>

<!-- ── TABLE ── -->
<table>

[T1] Tipado:
Definir columnas con ColumnDef<TData>[] con tipado estricto.
PROHIBIDO usar any en definición de columnas.

[T2] Escalabilidad:
Lógica de sorting, filtering y pagination debe ser server-side
para datasets mayores a 100 filas.

[T3] Estado:
No duplicar estado de tabla en el componente padre.
Usar table.getState() como fuente de verdad.
Evitar sincronizaciones manuales de estado.

</table>

<!-- ── FORM ── -->
<form>

[F1] Validación:
Integrar con class-validator mediante @hookform/resolvers/class-validator.

[F2] DTOs:
Usar DTOs compartidos para definir el esquema del formulario.
Debe existir consistencia entre frontend y backend.

[F3] Transformación:
Validación requiere instanciar el DTO usando plainToInstance antes del submit.

</form>

<!-- ── ROUTER ── -->
<router>

[R1] Tipado:
Rutas tipadas obligatorias.
Navegación debe ser type-safe.

[R2] Navegación:
PROHIBIDO navegar con strings sin validación del tipo.

[R3] Loaders:
Usar loaders para datos críticos de ruta.
PROHIBIDO hacer fetching dentro del componente para datos necesarios al montar.

</router>

<!-- ── PROHIBICIONES ── -->
<forbidden>

[X1] PROHIBIDO mezclar TanStack Query con SWR, RTK Query u otras librerías de server state.

[X2] PROHIBIDO usar queryClient.setQueryData para mutaciones optimistas
sin manejo de rollback explícito.

[X3] PROHIBIDO usar Zod para validación.
Se debe usar exclusivamente class-validator.

[X4] PROHIBIDO ignorar estados de isLoading o isError.
SIEMPRE manejar los tres estados: loading / error / success.

</forbidden>

</RULE>
