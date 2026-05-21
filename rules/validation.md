---
trigger: glob
globs: **/*.dto.ts, **/*.schema.ts, **/*.pipe.ts
---

<RULE id="workspace_validation_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = validación inconsistente, bugs silenciosos y riesgo de seguridad.
</core_enforcement>

<self_check>
Antes de validar cualquier input:

1. ¿Estoy usando class-validator como único sistema?
2. ¿El DTO está correctamente tipado y decorado?
3. ¿Estoy evitando duplicación de reglas entre frontend y backend?
4. ¿Los errores son claros y útiles para el usuario?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>

[P1] Una sola fuente de verdad:
La validación se define UNA vez en el DTO.

[P2] Validación en runtime:
TypeScript no valida en ejecución.
class-validator es obligatorio para asegurar integridad real.

[P3] Consistencia fullstack:
Frontend y Backend deben validar EXACTAMENTE lo mismo.

[P4] Fallar temprano:
Todo input inválido debe ser rechazado antes de llegar a lógica de negocio.

[P5] Errores útiles:
Cada error debe indicar qué falló y cómo corregirlo.

</philosophy>

<!-- ── ECOSISTEMA ÚNICO ── -->
<ecosystem>

[E1] Librerías permitidas:
class-validator + class-transformer.

[E2] Exclusividad:
PROHIBIDO mezclar con otros sistemas de validación.

[E3] Compatibilidad:
DTOs deben ser reutilizables entre frontend y backend.

[E4] Decoradores:
Toda validación debe declararse mediante decoradores.

</ecosystem>

<!-- ── DTOs ── -->
<dtos>

[D1] Definición:
Un DTO por operación.
Ej:
CreateUserDto
UpdateUserDto

[D2] Responsabilidad:
DTO define: - estructura - tipos - validaciones

[D3] Clases:
DTOs SIEMPRE como clases.
PROHIBIDO interfaces para validación.

[D4] Tipado:
Cada propiedad debe tener tipo explícito.

[D5] Mensajes:
Cada decorador debe incluir mensaje claro y humanizado.

[D6] Reutilización:
Usar Validation Groups cuando sea necesario.

</dtos>

<!-- ── FRONTEND ── -->
<frontend>

[F1] Instanciación:
SIEMPRE usar:
plainToInstance(DtoClass, formData)

[F2] Validación:
Ejecutar validación antes de enviar al backend.

[F3] Formularios:
Integrar con React Hook Form mediante:
@hookform/resolvers/class-validator

[F4] Sin duplicación:
PROHIBIDO redefinir reglas manualmente en el frontend.

[F5] Feedback:
Mostrar errores directamente al usuario usando mensajes del DTO.

</frontend>

<!-- ── BACKEND ── -->
<backend>

[B1] ValidationPipe:
Global obligatorio.

[B2] Configuración mínima:
whitelist: true
transform: true
forbidNonWhitelisted: true

[B3] Entrada:
Todo input HTTP debe pasar por DTO validado.

[B4] Seguridad:
Evitar mass assignment con whitelist.

[B5] Tipado automático:
transform convierte tipos (string → number, etc).

</backend>

<!-- ── VALIDATION GROUPS ── -->

<validation_groups>

[VG1] Uso:
Para diferenciar create vs update.

[VG2] Ejemplo:
@IsOptional({ groups: ['update'] })

[VG3] Consistencia:
Mantener lógica clara y documentada.

</validation_groups>

<!-- ── INTEGRACIÓN FULLSTACK ── -->
<integration>

[I1] DTO compartido:
Ubicar en paquete común (ej: /shared/dto).

[I2] Sin divergencia:
PROHIBIDO tener DTO distintos para front y back con mismas reglas.

[I3] Sincronización:
Cambios en DTO impactan ambos lados automáticamente.

</integration>

<!-- ── ERRORES DE VALIDACIÓN ── -->

<validation_errors>

[VE1] Claridad:
Mensajes en lenguaje de usuario.

[VE2] Acción:
Deben indicar cómo corregir el error.

[VE3] Consistencia:
Formato alineado con regla de error handling.

[VE4] Campo específico:
Cada error debe estar asociado a su campo.

</validation_errors>

<!-- ── REFLECT METADATA ── -->
<metadata>

[M1] Requisito:
reflect-metadata obligatorio.

[M2] Ubicación:
Importar en entry point:
main.ts (backend)
main.tsx / layout.tsx (frontend)

[M3] Sin esto:
class-validator NO funciona correctamente.

</metadata>

<!-- ── PROHIBICIONES CRÍTICAS ── -->
<forbidden>

[X1] PROHIBIDO usar Zod, Yup u otros validadores.

[X2] PROHIBIDO usar interfaces para validación.

[X3] PROHIBIDO validar manualmente en controllers o servicios.

[X4] PROHIBIDO duplicar reglas entre frontend y backend.

[X5] PROHIBIDO silenciar errores de validación.

[X6] PROHIBIDO aceptar datos sin validar.

[X7] PROHIBIDO mensajes vacíos, genéricos o técnicos.

</forbidden>

</RULE>
