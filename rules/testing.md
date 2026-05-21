---
trigger: glob
globs: **/*.spec.ts, **/*.e2e-spec.ts, **/*.test.ts
---

<RULE id="workspace_testing_v2" priority="WORKSPACE" lang="es">

<core_enforcement>
Estas reglas son OBLIGATORIAS dentro del workspace.
No son sugerencias.
Violarlas = tests frágiles, cobertura engañosa y pérdida de confianza en el sistema.
</core_enforcement>

<self_check>
Antes de escribir o modificar un test:

1. ¿Estoy testeando comportamiento o implementación interna?
2. ¿Este test fallaría si existe un bug real?
3. ¿El test es completamente independiente de otros?
   </self_check>

<!-- ── FILOSOFÍA ── -->
<philosophy>
  [P1] Tests como documentación: un test bien escrito describe el comportamiento esperado sin leer el código fuente.
  [P2] Pirámide de testing: más unit tests, menos integration, menos e2e. No invertir la pirámide.
  [P3] Un test = una aserción de comportamiento. No testear implementación interna, testear contratos.
  [P4] Cobertura no es calidad. Un test que no falla ante un bug real no aporta nada.
</philosophy>

<!-- ── UNIT TESTS ── -->
<unit>

[U1] Archivo:
[name].spec.ts junto al archivo que testea.
PROHIBIDO ubicarlo en carpeta separada.

[U2] Scope:
testear una unidad en aislamiento.
Todo lo externo debe ser mockeado.

[U3] Mocks:
En NestJS usar jest.fn() para funciones y objetos mock para repositorios y servicios.
Ejemplo:
const mockUserRepository = {
findOne: jest.fn(),
save: jest.fn(),
create: jest.fn(),
};

[U4] TestingModule:
Usar TestingModule para tests de servicios NestJS.
Ejemplo:
const module = await Test.createTestingModule({
providers: [
UserService,
{ provide: getRepositoryToken(User), useValue: mockUserRepository },
],
}).compile();

[U5] Limpieza:
Limpiar mocks entre tests con jest.clearAllMocks() en beforeEach.
PROHIBIDO estado compartido entre tests.

[U6] Nomenclatura:
describe('[ClassName]')
→ describe('[methodName]')
→ it('should [behavior] when [condition]')

</unit>

<!-- ── INTEGRATION TESTS ── -->
<integration>

[I1] Archivo:
[name].integration.spec.ts en carpeta test/.

[I2] Scope:
testear la interacción entre capas reales (servicio + repositorio + DB de test).

[I3] Base de datos:
usar instancia separada o SQLite en memoria.
PROHIBIDO usar DB de desarrollo o producción.

[I4] Módulo:
levantar TestingModule completo con módulo real.
PROHIBIDO usar mocks de repositorio.

[I5] Limpieza:
limpiar datos entre tests usando beforeEach con truncate de tablas relevantes.
PROHIBIDO depender del orden de ejecución.

[I6] Regla crítica:
NO mockear lo que se está integrando.
Si se testea servicio + repositorio, ambos deben ser reales.

</integration>

<!-- ── E2E TESTS ── -->
<e2e>

[E1] Archivo:
[feature].e2e-spec.ts en carpeta test/e2e/.

[E2] Scope:
flujo completo desde HTTP request hasta respuesta.
Testear contratos de API.

[E3] Herramienta:
usar supertest con la app de NestJS levantada completa.

[E4] Validación:
testear código de status HTTP,
estructura del body de respuesta,
headers críticos.

[E5] Regla:
NO testear lógica de negocio en e2e.
Esa responsabilidad pertenece a unit e integration tests.

[E6] Autenticación:
crear usuario y token de test en beforeAll.
PROHIBIDO hardcodear tokens.

</e2e>

<!-- ── GUARDS, INTERCEPTORS Y PIPES ── -->
<components>

[C1] Guards:
testear con canActivate() directamente.
Mockear ExecutionContext.

[C2] Interceptors:
testear con CallHandler mock que retorna of(mockData).

[C3] Pipes:
testear transform() directamente con inputs válidos e inválidos.

[C4] Exception Filters:
testear que el formato de respuesta es el esperado
ante cada tipo de excepción.

</components>

<!-- ── COBERTURA Y CALIDAD ── -->
<quality>

[Q1] Cobertura:
cobertura mínima en lógica de negocio (servicios): 80%.
No aplicar esta regla a controllers ni módulos.

[Q2] Enfoque:
NO escribir tests para aumentar el número.
Escribir tests para especificar comportamiento.

[Q3] Validación real:
tests que siempre pasan sin importar el código = tests inútiles.
Verificar que fallen cuando deben.

[Q4] Pendientes:
usar it.todo('should...') para comportamientos pendientes de testear.
Debe ser visible en el reporte.

</quality>

<!-- ── PROHIBICIONES ── -->
<forbidden>

[X1] PROHIBIDO usar la DB de desarrollo o producción en ningún test.

[X2] PROHIBIDO compartir estado entre tests.
Cada test debe poder ejecutarse en aislamiento.

[X3] PROHIBIDO mockear lo que se está integrando en integration tests.

[X4] PROHIBIDO escribir tests de implementación
(ej: verificar que se llamó repository.find()).
Se debe testear el resultado, no la llamada.

[X5] PROHIBIDO ignorar tests fallidos con it.skip
sin comentario justificado y ticket asociado.

</forbidden>

</RULE>
