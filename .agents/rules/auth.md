---
trigger: model_decision
description: Activar cuando la tarea involucre JWT, guards de autenticación, cookies HttpOnly, configuración de CORS o Helmet. El modelo detecta el contexto por vocabulario del prompt o imports relacionados.
---

<RULE id="workspace_auth_security_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = implementación insegura.
</core_enforcement>

<self_check>
Antes de implementar o modificar código de auth:

1. ¿Estoy usando JWT correctamente?
2. ¿Estoy exponiendo datos sensibles?
3. ¿Estoy rompiendo alguna regla de seguridad?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Seguridad primero. Toda decisión prioriza protección sobre conveniencia.
  [P2] Minimizar exposición de datos.
  [P3] Autenticación y autorización SIEMPRE separadas.
</philosophy>

<!-- ── JWT ── -->
<jwt>

[J1] Access token:
vida corta (15min - 1h).

[J2] Refresh token:
vida larga (7-30 días).

[J3] Payload:
solo datos mínimos (`sub`, `email`, `role`).
PROHIBIDO incluir datos sensibles.

[J4] Secret:
desde ConfigService.
PROHIBIDO hardcodear.
PROHIBIDO en repositorio.

[J5] Verificación:
SIEMPRE en JwtAuthGuard.
PROHIBIDO verificar manualmente.

[J6] Refresh token:
almacenar hash en DB.
PROHIBIDO guardar en claro.
invalidar en logout.

</jwt>

<!-- ── GUARDS ── -->
<guards>

[G1] JwtAuthGuard:
aplicar global con APP_GUARD.

[G2] Rutas públicas:
usar @Public().

[G3] Seguridad:
aplicar guard global evita rutas olvidadas.

[G4] RolesGuard:
ejecutar después de JwtAuthGuard.

[G5] Orden:
autenticación → autorización.

[G6] Responsabilidad:
guards solo verifican permisos.
PROHIBIDO lógica de negocio.
PROHIBIDO side effects.

</guards>

<!-- ── COOKIES ── -->
<cookies>

[C1] HttpOnly:
obligatorio.

[C2] Secure:
obligatorio en producción.

[C3] SameSite:
default 'strict'.
'lax' según flujo.
'none' SOLO si dominio distinto + documentado.

[C4] Expiración:
alineada con token.
PROHIBIDO cookies sin expiración.

[C5] Lectura:
usar @Req() o decorador @Cookies().

</cookies>

<!-- ── CORS ── -->
<cors>

[CS1] Configuración:
SOLO en main.ts con app.enableCors().

[CS2] origin:
lista explícita desde env.
PROHIBIDO '\*' en producción.

[CS3] credentials:
true SOLO si necesario.
requiere origin específico.

[CS4] métodos:
declarar explícitamente.

[CS5] headers:
PROHIBIDO allowedHeaders: '\*'.

[CS6] entorno:
dev flexible.
prod restrictivo.

</cors>

<!-- ── HELMET ── -->
<helmet>

[H1] Uso:
obligatorio en producción.

[H2] Headers críticos:
X-Frame-Options
X-Content-Type-Options
Strict-Transport-Security

[H3] Restricción:
PROHIBIDO deshabilitar sin análisis documentado.

</helmet>

<!-- ── SECRETOS ── -->
<secrets>

[S1] Variables sensibles:
JWT_SECRET, DB_PASSWORD, API_KEYS.

[S2] Ubicación:
.env local + gestor de secretos.

[S3] Repo:
PROHIBIDO incluir secrets.

[S4] .env:
SIEMPRE en gitignore.

[S5] .env.example:
obligatorio sin valores reales.

[S6] Acceso:
SOLO via ConfigService.
PROHIBIDO process.env directo.

</secrets>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO localStorage para access tokens.

[F2] PROHIBIDO mensajes de error detallados en auth.

[F3] PROHIBIDO auth custom sin revisar OWASP Top 10.

[F4] PROHIBIDO algorithm: 'none' en JWT.

[F5] PROHIBIDO deshabilitar CORS en producción.

</forbidden>

</RULE>
