---
trigger: glob
globs: **/*.controller.ts
---

<RULE id="workspace_api_design_v2" priority="CRITICAL" lang="es">

<core_enforcement>
Estas reglas son CRÍTICAS dentro del workspace.
No son sugerencias.
Violarlas = API inconsistente, insegura y difícil de mantener.
</core_enforcement>

<self_check>
Antes de diseñar o modificar un endpoint:

1. ¿El endpoint respeta REST y el contrato definido?
2. ¿Estoy usando el código HTTP correcto?
3. ¿Estoy rompiendo backward compatibility?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] El contrato es la fuente de verdad. El cliente depende de él.
  [P2] Consistencia > creatividad en diseño de endpoints.
  [P3] Una API bien diseñada reduce bugs en frontend y backend.
</philosophy>

<!-- ── CONTRATOS Y RUTAS ── -->
<routes>

[R1] Naming:
recursos en plural y minúsculas:
/users, /products, /orders.

[R2] Verbos:
PROHIBIDO usar verbos en la URL.

[R3] Acciones no-CRUD:
usar sub-recursos:
POST /orders/:id/cancel
POST /auth/refresh

[R4] Anidación:
máximo dos niveles:
/users/:id/orders ✓
/users/:id/orders/:id/items/:id ✗

[R5] Versionado:
obligatorio:
/api/v1/

[R6] Breaking changes:
requieren nueva versión.
PROHIBIDO romper contratos existentes.

</routes>

<!-- ── CÓDIGOS HTTP ── -->

<http_codes>

[H1] 200:
GET exitoso, PUT/PATCH con respuesta.

[H2] 201:
recurso creado. Debe retornar el recurso.

[H3] 204:
operación exitosa sin contenido (DELETE, algunos PUT).

[H4] 400:
error de validación de input.

[H5] 401:
no autenticado.

[H6] 403:
autenticado sin permisos.

[H7] 404:
recurso no encontrado.

[H8] 409:
conflicto (duplicados, estados incompatibles).

[H9] 422:
error de negocio (no de formato).

[H10] 500:
error interno.
PROHIBIDO exponer detalles.

</http_codes>

<!-- ── FORMATO DE RESPUESTA ── -->

<response_format>

[RF1] Éxito:
retornar recurso directamente o:
{ data, meta } para listas.

[RF2] Paginación:
obligatorio:
{
data: [],
meta: {
total,
page,
limit,
totalPages
}
}

[RF3] Error:
formato estándar obligatorio:

        {
          statusCode: number,
          error: string,
          message: string,
          timestamp: string,
          path: string
        }

[RF4] Consistencia:
PROHIBIDO múltiples formatos en distintos endpoints.

[RF5] Centralización:
HttpExceptionFilter garantiza formato uniforme.

</response_format>

<!-- ── DTOs Y SERIALIZACIÓN ── -->
<dto>

[D1] Exposición:
PROHIBIDO retornar entities directamente.

[D2] Mapping:
usar ResponseDto siempre.

[D3] Seguridad:
usar @Exclude() para campos sensibles.

[D4] Serialización:
usar ClassSerializerInterceptor global.

[D5] Transformación:
usar:
plainToInstance(ResponseDto, entity, {
excludeExtraneousValues: true
})

[D6] Documentación:
cada propiedad con @ApiProperty().

</dto>

<!-- ── DOCUMENTACIÓN (SWAGGER) ── -->
<swagger>

[S1] Configuración:
SwaggerModule en main.ts.

[S2] Acceso:
/api/docs en development.

[S3] Controllers:
usar @ApiTags().

[S4] Endpoints:
usar: - @ApiOperation() - @ApiResponse()

[S5] DTOs:
decorados completamente.

[S6] Producción:
proteger o deshabilitar Swagger.

</swagger>

<!-- ── IDEMPOTENCIA Y SEGURIDAD ── -->
<idempotency>

[I1] GET:
sin side effects.

[I2] HEAD / OPTIONS:
sin modificaciones.

[I3] PUT:
reemplazo completo.

[I4] PATCH:
modificación parcial.

[I5] Consistencia:
PROHIBIDO intercambiar PUT y PATCH.

</idempotency>

<!-- ── RATE LIMIT Y PERFORMANCE ── -->

<rate_limit>

[RL1] Implementación:
usar @nestjs/throttler.

[RL2] Auth:
endpoints críticos más restrictivos.

[RL3] Queries:
limitar resultados máximos.

[RL4] Protección:
evitar abuso en endpoints costosos.

</rate_limit>

<!-- ── DISEÑO DE ENDPOINTS ── -->

<endpoint_design>

[ED1] Responsabilidad:
un endpoint = una función clara.

[ED2] Simplicidad:
evitar endpoints con múltiples comportamientos.

[ED3] Predictibilidad:
el comportamiento debe ser intuitivo para el cliente.

[ED4] Consistencia:
patrones uniformes en toda la API.

</endpoint_design>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO retornar 200 en errores.

[F2] PROHIBIDO exponer stack traces.

[F3] PROHIBIDO usar DELETE para acciones no destructivas.

[F4] PROHIBIDO endpoints ambiguos o multipropósito.

[F5] PROHIBIDO omitir paginación en colecciones.

[F6] PROHIBIDO romper contratos existentes sin versionado.

</forbidden>

</RULE>
