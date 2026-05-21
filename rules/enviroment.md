---
trigger: model_decision
description: Activar al trabajar en configuración de entorno, variables de entorno, bootstrap de la app o validación de secrets. Solo en momentos específicos de setup o auditoría, no en el flujo de desarrollo diario.
globs: Activar al trabajar en configuración de entorno, variables de entorno, bootstrap de la app o validación de secrets. Solo en momentos específicos de setup o auditoría, no en el flujo de desarrollo diario.
---

<RULE id="workspace_environment_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = configuración inestable, insegura o no portable.
</core_enforcement>

<self_check>
Antes de levantar la app o agregar una variable de entorno:

1. ¿Esta variable está validada?
2. ¿Es crítica y no tiene default?
3. ¿Está documentada en .env.example?
4. ¿Estoy evitando process.env directo?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Configuración explícita > defaults implícitos.
  [P2] Fallar temprano > fallar en producción.
  [P3] Configuración centralizada > acceso disperso.
  [P4] Secrets nunca viven en el código.
</philosophy>

<!-- ── CONFIGMODULE ── -->

<config_module>

[CM1] Uso obligatorio:
ConfigModule.forRoot({
isGlobal: true,
validate,
envFilePath
})
SOLO una vez en AppModule.

[CM2] Alcance:
global.
PROHIBIDO importar múltiples veces.

[CM3] Validación:
usar class-validator + class-transformer.

[CM4] Falla crítica:
si falta variable crítica → app NO inicia.

</config_module>

<!-- ── VARIABLES DE ENTORNO ── -->

<environment_variables>

[EV1] Naming:
SCREAMING_SNAKE_CASE obligatorio.

[EV2] Prefijos:
DB*\*, REDIS*_, JWT\__, etc.

[EV3] Tipado:
usar env.config.ts con función tipada.

[EV4] Acceso:
ConfigService.get<Type>('key').

[EV5] PROHIBIDO:
process.env.X fuera del módulo de config.

[EV6] Agrupación:
usar registerAs() para namespaces:

        registerAs("database", () => ({
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
        }));

[EV7] Consumo:
ConfigService.get<DatabaseConfig>('database').

</environment_variables>

<!-- ── VALORES POR DEFECTO ── -->
<defaults>

[D1] Variables críticas:
PROHIBIDO tener defaults.

       Ejemplos críticos:
       - DB_*
       - JWT_*
       - API_KEYS

[D2] Variables no críticas:
permitido default.

       Ej:
       - PORT=3000
       - LOG_LEVEL=info

[D3] Regla:
si el valor incorrecto rompe el sistema → NO default.

</defaults>

<!-- ── ARCHIVOS .ENV ── -->

<env_files>

[EF1] .env:
solo desarrollo local.
SIEMPRE en .gitignore.

[EF2] .env.example:
obligatorio.
completo.
sin valores reales.

[EF3] .env.test:
para testing.
en gitignore si tiene secrets.

[EF4] Entornos:
development
staging
production

[EF5] Control:
usar NODE_ENV para comportamiento.

</env_files>

<!-- ── SECRETOS ── -->
<secrets>

[S1] Producción:
usar gestores de secretos: - AWS Secrets Manager - GCP Secret Manager - Vault

[S2] Repositorio:
PROHIBIDO commitear secrets.

[S3] Builds:
PROHIBIDO hardcodear secrets.

[S4] Rotación:
sistema debe permitir rotación sin downtime.

[S5] Acceso:
SIEMPRE via ConfigService.

</secrets>

<!-- ── VARIABLES CRÍTICAS ── -->

<required_variables>

[RV1] Entorno:
NODE_ENV (development | staging | production)

[RV2] Servidor:
PORT

[RV3] Base de datos:
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD

[RV4] Auth:
JWT_SECRET
JWT_EXPIRES_IN
JWT_REFRESH_SECRET
JWT_REFRESH_EXPIRES_IN

[RV5] Seguridad:
CORS_ORIGINS

[RV6] API:
API_PREFIX

[RV7] Regla:
TODAS deben validarse al arranque.

</required_variables>

<!-- ── MULTI-ENTORNO ── -->

<multi_environment>

[ME1] Separación:
cada entorno tiene configuración independiente.

[ME2] Seguridad:
PROHIBIDO compartir JWT_SECRET entre entornos.

[ME3] Aislamiento:
dev ≠ staging ≠ production.

</multi_environment>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[F1] PROHIBIDO usar process.env directamente.

[F2] PROHIBIDO commitear .env.

[F3] PROHIBIDO variables sin documentar en .env.example.

[F4] PROHIBIDO iniciar app sin variables críticas.

[F5] PROHIBIDO defaults en secrets o DB config.

[F6] PROHIBIDO compartir secrets entre entornos.

</forbidden>

</RULE>
