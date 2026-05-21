---
trigger: glob
globs: **/*.filter.ts, **/*.interceptor.ts, **/*.error.ts, **/errors/*.ts
---

<RULE id="workspace_error_handling_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = API inconsistente, insegura o incomprensible para el usuario.
</core_enforcement>

<self_check>
Antes de lanzar o mapear un error:

1. ¿Este mensaje lo entendería un usuario no técnico?
2. ¿Estoy filtrando información sensible?
3. ¿El error explica cómo resolverlo?
4. ¿Estoy usando AppException o lancé un Error genérico?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Todo error debe ser comprensible, accionable y no técnico.
  [P2] Nunca exponer detalles internos del sistema.
  [P3] Un error tiene dos audiencias: usuario (mensaje) y dev (logs).
  [P4] Un buen error responde: qué pasó, por qué pasó y cómo solucionarlo.
</philosophy>

<!-- ── JERARQUÍA DE ERRORES ── -->

<error_hierarchy>

[EH1] Base:
toda excepción de dominio hereda de AppException.

[EH2] Tipos obligatorios: - ApiError - ValidationError - NotFoundError

[EH3] Estructura obligatoria: - httpStatus (fijo) - error_code (interno) - message (humanizado) - help (acción clara)

[EH4] Separación:
servicios lanzan errores de dominio.
filters traducen a HTTP.

[EH5] PROHIBIDO:
lógica HTTP dentro de servicios.

</error_hierarchy>

<!-- ── CONTRATO DE RESPUESTA ── -->

<error_response_contract>

[ERC1] Formato obligatorio:

{
"success": false,
"error": {
"code": "VALIDATION_ERROR",
"message": "...",
"help": "...",
"fields": [...],
"timestamp": "...",
"path": "...",
"requestId": "..."
}
}

[ERC2] fields:
solo en ValidationError.

[ERC3] fields structure: - field - message - received - expected

[ERC4] help:
SIEMPRE presente.
SIEMPRE accionable.

[ERC5] Metadata:
timestamp, path y requestId obligatorios.

</error_response_contract>

<!-- ── MENSAJES HUMANIZADOS ── -->

<humanized_messages>

[HM1] Segunda persona:
"Tu email..." no "El email del usuario..."

[HM2] Tiempo presente:
"El campo es requerido"

[HM3] Acción incluida:
"Ingresa un email válido como..."

[HM4] Estilo:
claro, corto, sin tecnicismos.

[HM5] Auth:
SIEMPRE genérico.
no revelar existencia de usuario.

[HM6] PROHIBIDO: - "Error interno" - "Something went wrong" - "Unexpected error" - null / undefined - [object Object]

</humanized_messages>

<!-- ── EXCEPTION FILTER ── -->

<exception_filter>

[EF1] AllExceptionsFilter:
captura TODAS las excepciones.

[EF2] Pipeline de decisión:

        1. AppException → mapper dominio
        2. HttpException → normalizar
        3. QueryFailedError → mapear DB
        4. Otro → 500 genérico

[EF3] Logging obligatorio: - error original - stack - requestId - path - método HTTP - body (sin datos sensibles)

[EF4] Garantía:
nunca llega error sin formatear al cliente.

</exception_filter>

<!-- ── INTERCEPTOR ── -->

<response_interceptor>

[RI1] TransformResponseInterceptor global.

[RI2] Formato:

        {
          "success": true,
          "data": {...},
          "meta": {
            "timestamp": "...",
            "requestId": "..."
          }
        }

[RI3] Paginación:
agregar:
"pagination": {
total,
page,
limit,
totalPages
}

[RI4] Restricción:
PROHIBIDO lógica de negocio en interceptors.

</response_interceptor>

<!-- ── MAPPERS ESPECÍFICOS ── -->

<error_mappers>

[EM1] ApiError:

        BUSINESS_RULE_VIOLATED → 422
        INVALID_STATE → 409
        OPERATION_NOT_ALLOWED → 403

[EM2] ValidationError:

        HTTP 400

        - generar fields[]
        - incluir received y expected
        - mensaje resumen:
          "Encontramos X campos con información incorrecta."

[EM3] NotFoundError:

        HTTP 404

        - mensaje sin exponer internals
        - help con sugerencia

[EM4] QueryFailedError:

        Unique → 409
        Foreign key → 422
        Not null → 400

        PROHIBIDO exponer SQL.

</error_mappers>

<!-- ── SEGURIDAD DE ERRORES ── -->

<error_security>

[ES1] Nunca exponer: - stack traces - SQL - nombres de tablas/columnas - clases internas

[ES2] Sanitización:
logs internos completos
respuesta externa filtrada

[ES3] Auth:
respuestas indistinguibles para evitar user enumeration

</error_security>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO retornar stack traces al cliente.

[F2] PROHIBIDO exponer SQL o detalles de DB.

[F3] PROHIBIDO mensajes genéricos sin acción.

[F4] PROHIBIDO diferenciar errores de auth.

[F5] PROHIBIDO usar new Error() en servicios.

[F6] PROHIBIDO silenciar errores (catch vacío).

[F7] PROHIBIDO retornar null/undefined en lugar de error.

</forbidden>

</RULE>
