---
trigger: model_decision
description: Activar cuando la tarea involucre Redis, CacheModule, rate limiting, ThrottlerGuard, optimización de queries TypeORM o índices de DB. El modelo detecta el contexto por vocabulario del prompt o imports.
---

<RULE id="workspace_performance_cache_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = degradación de performance, bugs de consistencia y fallos en producción.
</core_enforcement>

<self_check>
Antes de optimizar o usar caché:

1. ¿Tengo datos reales (profiling) que justifican esto?
2. ¿Estoy introduciendo inconsistencia de datos?
3. ¿Estoy resolviendo el problema o escondiéndolo con caché?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>

[P1] Medir antes de optimizar.
Sin profiling = optimización inválida.

[P2] Caché = consistencia eventual.
Siempre existe riesgo de datos desactualizados.

[P3] El mejor query es el que no se ejecuta.

[P4] Optimización sin comprensión del problema
= deuda técnica futura.

</philosophy>

<!-- ── CACHE-MANAGER (NESTJS) ── -->

<cache_manager>

[CM1] Store:
Redis en producción obligatorio.
Memoria solo en desarrollo.

[CM2] Configuración:
usar CacheModule.registerAsync().

[CM3] TTL:
obligatorio en TODA key.

[CM4] PROHIBIDO:
ttl: 0 o caché sin expiración.

[CM5] Naming:
formato jerárquico obligatorio:
[recurso]:[id]:[variante]

[CM6] Ejemplos:
user:123:profile
products:list:page:1

[CM7] Controllers:
usar @CacheKey() y @CacheTTL()
para endpoints GET.

[CM8] Caché por usuario:
incluir userId en la key.

[CM9] PROHIBIDO:
mezclar datos entre usuarios.

[CM10] Invalidación:
usar tags o patrones.

[CM11] PROHIBIDO:
invalidar toda la caché por cambios puntuales.

</cache_manager>

<!-- ── REDIS ── -->
<redis>

[R1] Conexión:
usar ioredis vía ConfigService.

[R2] PROHIBIDO:
strings de conexión hardcodeados.

[R3] Serialización:
JSON explícito obligatorio.

[R4] Prefijo:
incluir NODE_ENV:
prod:user:123

[R5] Objetivo:
evitar colisiones entre entornos.

[R6] Comandos costosos:
PROHIBIDOS en producción: - KEYS \* - SMEMBERS (en sets grandes)

[R7] Alternativa:
usar SCAN con cursor.

[R8] Expiración:
usar siempre:
SET key value EX seconds

[R9] PROHIBIDO:
keys sin TTL en producción.

</redis>

<!-- ── OPTIMIZACIÓN DE QUERIES ── -->

<query_optimization>

[Q1] Índices:
crear en columnas usadas en:
WHERE, ORDER BY, JOIN.

[Q2] Documentación:
todo índice debe documentarse en migración.

[Q3] SELECT:
usar selección explícita.

[Q4] PROHIBIDO:
SELECT \* innecesario.

[Q5] Paginación:
obligatoria en colecciones.

[Q6] Límite:
máximo definido (ej: 100).

[Q7] PROHIBIDO:
queries sin límite.

[Q8] Profiling:
usar EXPLAIN o EXPLAIN ANALYZE.

[Q9] PROHIBIDO:
optimizar sin ver plan de ejecución.

[Q10] Relaciones:
cargar solo lo necesario.

[Q11] PROHIBIDO:
relaciones por inercia.

[Q12] Batch:
usar insert() y update() en lote.

[Q13] PROHIBIDO:
loops con save().

</query_optimization>

<!-- ── RATE LIMITING ── -->

<rate_limiting>

[RL1] Implementación:
@nestjs/throttler obligatorio.

[RL2] Configuración global:
ThrottlerGuard como APP_GUARD.

[RL3] Default:
ttl: 60
limit: 100

[RL4] Endpoints críticos (auth):
ttl: 60
limit: 10

[RL5] Ajuste:
por endpoint según uso.

[RL6] Skip:
@SkipThrottle SOLO en: - endpoints internos - webhooks autenticados

[RL7] Requisito:
documentar el motivo.

[RL8] Headers:
retornar:
X-RateLimit-Limit
X-RateLimit-Remaining

</rate_limiting>

<!-- ── RESPUESTAS Y COMPRESIÓN ── -->
<responses>

[RES1] Compresión:
usar compression middleware en producción.

[RES2] Objetivo:
reducir tamaño de payload.

[RES3] Payload:
incluir solo datos necesarios.

[RES4] Impacto:
payload grande = peor UX.

[RES5] Archivos grandes:
usar streaming.

[RES6] PROHIBIDO:
cargar archivos completos en memoria.

</responses>

<!-- ── ANTI-PATTERNS REALES ── -->

<anti_patterns>

[AP1] Usar caché para ocultar queries lentas
en lugar de optimizarlas.

[AP2] Invalidar toda la caché por cada cambio.

[AP3] No usar TTL → memory leaks en Redis.

[AP4] Cachear datos altamente dinámicos
(ej: balances en tiempo real).

[AP5] N+1 queries silenciosas
que se "arreglan" con caché.

</anti_patterns>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO cachear:
passwords, tokens, PII sin cifrado.

[F2] PROHIBIDO:
caché sin TTL.

[F3] PROHIBIDO:
invalidación global innecesaria.

[F4] PROHIBIDO:
queries sin limit.

[F5] PROHIBIDO:
añadir índices sin medir impacto.

[F6] PROHIBIDO:
optimizar sin profiling.

[F7] PROHIBIDO:
usar caché como sustituto de diseño correcto.

</forbidden>

</RULE>
