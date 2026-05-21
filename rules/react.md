---
trigger: glob
globs: **/*.tsx, **/*.jsx
---

<RULE id="workspace_react_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = código React frágil, difícil de escalar y propenso a bugs.
</core_enforcement>

<self_check>
Antes de crear o modificar un componente:

1. ¿Este componente tiene una sola responsabilidad clara?
2. ¿Estoy manejando correctamente el estado (local vs global vs server)?
3. ¿Estoy usando hooks de forma correcta y sin efectos innecesarios?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Simplicidad primero. Componentes pequeños, claros y predecibles.
  [P2] Estado mínimo necesario. Menos estado = menos bugs.
  [P3] Render determinístico. El UI debe ser función pura del estado.
</philosophy>

<!-- ── COMPONENTES ── -->
<components>

[C1] Tipo:
solo functional components.
PROHIBIDO class components en código nuevo.

[C2] Responsabilidad:
un componente = una responsabilidad. >150 líneas = evaluar división.

[C3] Naming:
PascalCase obligatorio.

[C4] Archivos:
nombre del archivo = nombre del componente.

[C5] Props:
interface explícita:
[ComponentName]Props.

[C6] Tipado:
PROHIBIDO usar any en props.

</components>

<!-- ── ESTADO ── -->
<state>

[S1] Jerarquía:
useState → useContext → TanStack Query.

[S2] Elevación:
no elevar estado prematuramente.

[S3] Estado derivado:
calcular en render.
PROHIBIDO duplicarlo en useState.

[S4] Complejidad:
usar useReducer para estados complejos.

[S5] Inmutabilidad:
siempre nuevas referencias en updates.

</state>

<!-- ── EFECTOS ── -->
<effects>

[E1] Uso:
solo para sincronización externa.

[E2] Dependencias:
array obligatorio y explícito.

[E3] Omisiones:
prohibidas sin justificación documentada.

[E4] Cleanup:
obligatorio en: - subscriptions - timers - listeners

[E5] Restricciones:
PROHIBIDO usar useEffect para: - fetching (usar TanStack Query) - estado derivado

</effects>

<!-- ── RENDIMIENTO ── -->
<performance>

[P1] React.memo:
usar solo si: - componente costoso - props estables

[P2] useMemo:
solo para cálculos costosos.

[P3] useCallback:
solo para props en componentes memoizados.

[P4] JSX:
evitar objetos/funciones inline cuando afecten memoización.

[P5] Re-renders:
minimizar renders innecesarios.

</performance>

<!-- ── PATRONES ── -->
<patterns>

[PT1] Composición:
preferir children sobre flags booleanos.

[PT2] Custom hooks:
lógica reutilizable extraída.

[PT3] Naming:
hooks empiezan con "use".

[PT4] Retorno:
objetos nombrados, no arrays (excepto hooks nativos-like).

[PT5] Error boundaries:
obligatorios en: - rutas - secciones críticas

[PT6] Suspense:
usar para: - lazy loading - async components

</patterns>

<!-- ── EVENTOS Y LISTAS ── -->

<events_lists>

[EL1] Keys:
usar IDs estables.

[EL2] Restricción:
PROHIBIDO usar index como key en listas dinámicas.

[EL3] Eventos:
desestructurar antes de async operations.

[EL4] Persistencia:
evitar acceso tardío a event sin manejo adecuado.

</events_lists>

<!-- ── RENDER Y API MODERNA ── -->
<rendering>

[R1] API:
usar createRoot.

[R2] Restricción:
PROHIBIDO ReactDOM.render en código nuevo.

[R3] Pureza:
render sin side effects.

</rendering>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO mutar estado directamente.

[F2] PROHIBIDO usar any en props o estado.

[F3] PROHIBIDO usar useEffect incorrectamente.

[F4] PROHIBIDO duplicar estado derivado.

[F5] PROHIBIDO usar index como key en listas dinámicas.

[F6] PROHIBIDO crear componentes monolíticos sin dividir.

</forbidden>

</RULE>
