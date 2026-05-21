---
trigger: glob
globs: **/*.entity.ts, **/migrations/*.ts, **/*.repository.ts
---

<RULE id="workspace_typeorm_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = degradación de performance, inconsistencias de datos o corrupción silenciosa.
</core_enforcement>

<self_check>
Antes de trabajar con TypeORM:

1. ¿Estoy separando correctamente lógica de negocio y acceso a datos?
2. ¿Estoy evitando problemas de N+1 y queries innecesarias?
3. ¿Estoy respetando integridad y consistencia de datos?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Las entities representan estructura de datos, no lógica de negocio.
  [P2] Las queries deben ser explícitas, eficientes y controladas.
  [P3] La integridad de datos es prioritaria sobre la conveniencia.
</philosophy>

<!-- ── ENTITIES ── -->
<entities>

[E1] Organización:
Cada entity debe estar en su propio archivo.
Nombre obligatorio: [Domain].entity.ts.

[E2] Columnas:
Tipar explícitamente todas las columnas.
Ejemplo: @Column({ type: 'varchar', length: 255 }).
PROHIBIDO usar tipos implícitos.

[E3] Primary key:
Usar @PrimaryGeneratedColumn('uuid') por defecto.
PROHIBIDO usar enteros autoincrementales en APIs públicas.

[E4] Timestamps:
Incluir @CreateDateColumn() y @UpdateDateColumn() en toda entity.
PROHIBIDO manejar fechas manualmente.

[E5] Soft delete:
Usar @DeleteDateColumn() junto con { withDeleted: false } en queries cuando aplique.
Si una entity no utiliza soft delete, se debe documentar explícitamente el motivo.

</entities>

<!-- ── RELACIONES ── -->
<relations>

[R1] Definición:
Definir ambos lados de la relación (@OneToMany + @ManyToOne).
PROHIBIDO relaciones unilaterales sin justificación documentada.

[R2] eager loading:
eager: false por defecto en todas las relaciones.
Cargar relaciones explícitamente usando relations o QueryBuilder.

[R3] cascade:
Declarar solo las operaciones necesarias (['insert'], ['update']).
PROHIBIDO usar cascade: true genérico sin análisis de impacto.

[R4] N+1:
Evitar problemas de N+1 usando QueryBuilder con leftJoinAndSelect
o relations en el find.
PROHIBIDO acceder a relaciones lazy sin contexto de transacción activo.

</relations>

<!-- ── REPOSITORIOS Y QUERIES ── -->
<queries>

[Q1] Repositorios:
Crear repositorios custom extendiendo Repository<Entity>.
Inyectar mediante @InjectRepository().
PROHIBIDO colocar lógica de queries en servicios.

[Q2] Queries complejas:
Usar QueryBuilder con alias descriptivos.
Mantener claridad y legibilidad en las queries.

[Q3] SQL raw:
Usar query() solo como último recurso.
Debe documentarse en el código por qué QueryBuilder no fue suficiente.

[Q4] Paginación:
Usar siempre take + skip con un límite máximo definido (ej: máximo 100 registros).
PROHIBIDO ejecutar queries sin límite en producción.

</queries>

<!-- ── MIGRACIONES ── -->
<migrations>

[M1] synchronize:
PROHIBIDO usar synchronize: true fuera de entorno de desarrollo local.
En staging y producción deben usarse migraciones explícitas.

[M2] Naming:
Toda migración debe tener nombre descriptivo con timestamp.
Formato obligatorio: [timestamp]-[accion-descriptiva].ts.

[M3] Migraciones irreversibles:
Si una migración no puede revertirse,
se debe documentar explícitamente en el método down().
PROHIBIDO dejar down() vacío sin explicación.

[M4] Revisión:
Antes de ejecutar una migración,
revisar el diff completo manualmente.
PROHIBIDO aplicar migraciones generadas automáticamente sin inspección.

</migrations>

<!-- ── TRANSACCIONES ── -->
<transactions>

[T1] Uso:
Toda operación que modifique múltiples tablas
debe ejecutarse dentro de una transacción.

[T2] Patrón:
Usar dataSource.transaction(async (manager) => { ... }).

[T3] queryRunner:
PROHIBIDO usar queryRunner manualmente salvo necesidad de control granular.
Es más verboso y propenso a errores.

[T4] Rollback:
El rollback es implícito cuando ocurre una excepción dentro del callback.
PROHIBIDO capturar excepciones dentro de la transacción sin relanzarlas.

</transactions>

<!-- ── PROHIBICIONES ── -->
<forbidden>

[X1] PROHIBIDO usar synchronize: true en producción o staging.
Es destructivo y puede causar pérdida de datos sin aviso.

[X2] PROHIBIDO ejecutar queries dentro de loops.
Usar operaciones batch o QueryBuilder con IN.

[X3] PROHIBIDO exponer entities directamente como respuesta de API.
Siempre mapear a DTOs.

[X4] PROHIBIDO almacenar lógica de negocio dentro de entities.
Las entities solo representan estructura y relaciones.

[X5] PROHIBIDO ignorar el resultado de affected en operaciones update() y delete().
Se debe verificar que la operación afectó filas.

</forbidden>

</RULE>
