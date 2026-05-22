---
trigger: model_decision
description: Activar cuando la tarea involucre logging, exception filters, interceptors de trazabilidad o manejo centralizado de errores. El modelo detecta el contexto por vocabulario del prompt o tipo de archivo.
globs: Activar cuando la tarea involucre logging, exception filters, interceptors de trazabilidad o manejo centralizado de errores. El modelo detecta el contexto por vocabulario del prompt o tipo de archivo.
---

<RULE id="workspace_logging_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = pérdida de trazabilidad, debugging imposible o fuga de datos sensibles.
</core_enforcement>

<self_check>
Antes de agregar o modificar logs:

1. ¿Este log aporta valor real o es ruido?
2. ¿Estoy exponiendo datos sensibles?
3. ¿El log tiene contexto suficiente (requestId, clase, acción)?
4. ¿Podría debuggear este flujo solo con logs?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Logging sirve para entender el sistema sin reproducir el bug.
  [P2] Todo evento importante debe ser trazable de inicio a fin.
  [P3] Más logs ≠ mejor logging. Precisión > volumen.
  [P4] Logs nunca deben comprometer seguridad.
</philosophy>

<!-- ── LOGGER ── -->
<logger>

[L1] Implementación:
usar Logger nativo de NestJS.

[L2] PROHIBIDO:
console.log, console.error, console.warn en producción.

[L3] Instancia por clase:
private readonly logger = new Logger(ClassName.name)

[L4] Contexto:
SIEMPRE incluir contexto de clase/método.

[L5] Niveles:

       error:
         - excepciones críticas
         - errores de DB
         - fallos no controlados
         - SIEMPRE incluir stack

       warn:
         - degradación
         - reintentos
         - situaciones recuperables

       log:
         - eventos de negocio importantes

       debug:
         - flujo detallado
         - SOLO development

       verbose:
         - granularidad extrema
         - uso puntual

[L6] Configuración:
LOG_LEVEL desde env.

       production:
         error, warn, log

       development:
         todos

</logger>

<!-- ── QUÉ LOGGEAR ── -->

<what_to_log>

[WL1] SIEMPRE loggear:

        - inicio/fin de operaciones críticas
        - errores con contexto
        - eventos de negocio (ej: usuario creado)
        - requests entrantes (método + path)

[WL2] Logs de request:

        usar LoggingInterceptor global.

[WL3] Timing:
medir duración request/response.

[WL4] PROHIBIDO duplicar:
no loggear requests manualmente en controllers.

</what_to_log>

<!-- ── DATOS SENSIBLES ── -->

<sensitive_data>

[SD1] PROHIBIDO loggear: - passwords - tokens (JWT, refresh) - tarjetas - PII en texto plano

[SD2] Estrategia:
enmascarar o excluir.

[SD3] Ejemplo:
email → u\*\*\*@dominio.com

[SD4] Logs de request body:
solo parcial y sanitizado.

</sensitive_data>

<!-- ── EXCEPTION FILTERS ── -->

<exception_filters>

[EF1] HttpExceptionFilter:
captura HttpException.

[EF2] AllExceptionsFilter:
fallback global.

[EF3] Orden:
específico → genérico.

[EF4] Logging:

        SIEMPRE loggear:
        - error original
        - stack
        - requestId
        - path
        - método HTTP

[EF5] Respuesta:

        - cliente: error filtrado
        - logs: error completo

[EF6] PROHIBIDO:
exponer stack trace al cliente.

</exception_filters>

<!-- ── CORRELACIÓN ── -->

<request_correlation>

[RC1] requestId obligatorio:
generar UUID por request.

[RC2] Header:
X-Request-ID

[RC3] Propagación:
incluir requestId en TODOS los logs.

[RC4] Implementación:
middleware o interceptor global.

[RC5] Microservicios:
propagar correlationId entre servicios.

[RC6] Regla:
NUNCA perder la traza entre servicios.

</request_correlation>

<!-- ── ERRORES DE DOMINIO ── -->

<domain_errors>

[DE1] Jerarquía:

        AppException
          ├── NotFoundException
          ├── ConflictException
          ├── ForbiddenException
          └── ValidationException

[DE2] Logging:

        logs → mensaje técnico completo
        cliente → mensaje humanizado

[DE3] Separación:
servicios no conocen HTTP.

</domain_errors>

<!-- ── CALIDAD DE LOGS ── -->

<log_quality>

[LQ1] Todo log debe responder: - qué pasó - dónde pasó - con qué contexto

[LQ2] Formato consistente:
evitar logs desestructurados.

[LQ3] Evitar ruido:
logs innecesarios degradan debugging.

[LQ4] Logs útiles:
deben permitir reconstruir el flujo.

</log_quality>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO usar console.log en producción.

[F2] PROHIBIDO loggear datos sensibles.

[F3] PROHIBIDO logs sin contexto.

[F4] PROHIBIDO silenciar errores.

[F5] PROHIBIDO retornar stack traces al cliente.

[F6] PROHIBIDO duplicar logs de requests.

</forbidden>

</RULE>
