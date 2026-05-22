---
trigger: glob
description: Activar en archivos .module, .service, .controller, .guard, .interceptor, .pipe, .filter y .decorator. Cubre arquitectura de módulos, inyección de dependencias, capas y decoradores propios de NestJS.
globs: **/*.module.ts, **/*.controller.ts, **/*.service.ts, **/*.guard.ts, **/*.interceptor.ts, **/*.pipe.ts, **/*.filter.ts
---

<RULE id="workspace_nest_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = arquitectura frágil, acoplamiento alto y difícil mantenimiento.
</core_enforcement>

<self_check>
Antes de crear o modificar código en NestJS:

1. ¿Estoy respetando separación de responsabilidades (controller vs service)?
2. ¿Estoy acoplando lógica de negocio a HTTP o framework?
3. ¿Estoy rompiendo la modularidad del dominio?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>

[P1] Arquitectura por dominios, no por tecnología.

[P2] Separación estricta de capas:
Controller ≠ Service ≠ Data Access.

[P3] Bajo acoplamiento, alta cohesión.

[P4] El framework (NestJS) es un detalle, no el núcleo del negocio.

</philosophy>

<!-- ── ARQUITECTURA Y MÓDULOS ── -->
<modules>

[M1] Un módulo por dominio.
Ej: UsersModule, AuthModule, OrdersModule.

[M2] PROHIBIDO módulos "catch-all"
(ej: SharedModule con lógica mezclada).

[M3] AppModule:
SOLO importa módulos.
PROHIBIDO lógica de negocio.
PROHIBIDO providers complejos.

[M4] Infraestructura:
DB, cache, mail → módulos dedicados.
usar forRoot / forRootAsync.

[M5] Dependencias circulares:
son ERROR de diseño.
PROHIBIDO resolver con forwardRef como solución permanente.

[M6] Solución correcta:
reestructurar dominio o usar eventos.

</modules>

<!-- ── PROVIDERS Y SERVICIOS ── -->
<services>

[S1] Responsabilidad:
servicios contienen lógica de negocio.

[S2] PROHIBIDO:
acceso directo a Request o Response.

[S3] PROHIBIDO:
lógica HTTP (status codes, headers).

[S4] Inyección:
usar interfaces cuando existan múltiples implementaciones.

[S5] Repositorios:
capa separada.
el servicio NO conoce TypeORM directamente.

[S6] Scope:
SINGLETON por defecto.

[S7] REQUEST scope:
SOLO si es estrictamente necesario.
(impacta rendimiento).

</services>

<!-- ── CONTROLLERS ── -->
<controllers>

[C1] Responsabilidad:
orquestación únicamente.

[C2] Flujo obligatorio:
request → service → response.

[C3] PROHIBIDO:
lógica de negocio en controllers.

[C4] Estructura:
un controller por dominio/recurso.

[C5] Rutas:
agrupadas bajo un prefix coherente.

[C6] Decoradores:
usar @Get, @Post, @Put, @Patch, @Delete.
PROHIBIDO strings mágicos.

[C7] Tipado:
retorno tipado obligatorio.
PROHIBIDO any o Promise<any>.

</controllers>

<!-- ── PIPELINE DE EJECUCIÓN ── -->
<pipeline>

[PIP1] Orden de ejecución:
Middleware →
Guards →
Interceptors (pre) →
Pipes →
Controller →
Interceptors (post) →
Exception Filters

[PIP2] OBLIGATORIO:
conocer este orden antes de implementar lógica transversal.

</pipeline>

<!-- ── PIPES, GUARDS E INTERCEPTORS ── -->

<cross_cutting>

[X1] Pipes:
validación y transformación de input.

[X2] ValidationPipe:
global obligatorio.

[X3] Guards:
SOLO autorización/autenticación.

[X4] PROHIBIDO en guards:
lógica de negocio.

[X5] Interceptors:
logging, transformación de respuesta, caché.

[X6] Regla:
un interceptor = una responsabilidad.

</cross_cutting>

<!-- ── EXCEPTION FILTERS ── -->
<exceptions>

[E1] Excepciones de dominio:
clases custom obligatorias.

[E2] Deben extender:
HttpException o base propia (AppException).

[E3] HttpExceptionFilter:
global obligatorio.

[E4] Responsabilidad:
normalizar formato de error.

[E5] Servicios:
NO conocen HTTP.

[E6] PROHIBIDO:
lanzar new Error() genérico.

</exceptions>

<!-- ── DECORADORES CUSTOM ── -->
<decorators>

[D1] Decoradores de parámetro:
para extraer datos del request.
ej: @CurrentUser()

[D2] Decoradores de metadata:
ej: @Roles(), @Public()

[D3] PROHIBIDO:
duplicar lógica de extracción en controllers.

[D4] Reutilización:
encapsular en decoradores.

</decorators>

<!-- ── CONFIGURACIÓN ── -->
<configuration>

[CFG1] ConfigModule:
forRoot({ isGlobal: true, validate }) obligatorio.

[CFG2] Validación:
schema validado al arranque.

[CFG3] Acceso:
SOLO via ConfigService.

[CFG4] PROHIBIDO:
uso directo de process.env.

</configuration>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO usar @Res()
(rompe interceptors y serialización).

[F2] EXCEPCIÓN:
streaming o manejo avanzado de cookies.

[F3] PROHIBIDO importar TypeOrmModule,
JwtModule u otros directamente en módulos de dominio.

[F4] Infraestructura SIEMPRE encapsulada.

[F5] PROHIBIDO lanzar excepciones HTTP en servicios.

[F6] PROHIBIDO registrar APP_GUARD / APP_INTERCEPTOR
sin documentación en el plan.

[F7] PROHIBIDO mezclar responsabilidades
entre capas.

</forbidden>

</RULE>
