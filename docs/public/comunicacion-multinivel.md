# Comunicación de la arquitectura a diferentes públicos

Este documento es el entregable de la Fase 3 del reto. Presenta la misma
arquitectura de **Angular Architecture Docs** desde dos perspectivas por cada
nivel de abstracción del modelo C4: una **técnica** (para desarrollo y
arquitectura) y una **de negocio** (para stakeholders no técnicos). El objetivo
es que cada público pueda tomar decisiones informadas sin necesidad de leer la
documentación destinada al otro.

> Principio rector: una sola verdad, dos lenguajes. Ambas perspectivas describen
> el mismo sistema; cambian el vocabulario y el nivel de detalle, no los hechos.

## Qué es el sistema (en una frase)

Una aplicación web Angular que convierte documentación de arquitectura escrita
como texto (Markdown + diagramas Mermaid) en un sitio navegable, versionado junto
al código y servido como contenido estático.

## Cómo leer este documento según tu rol

| Si sos... | Empezá por | Buscás responder |
|-----------|-----------|------------------|
| Stakeholder / negocio | las secciones "Negocio" de cada nivel | ¿Qué valor da y qué riesgos/costos implica? |
| Product / gestión | Contexto (ambas) y Decisión | ¿Qué hace, de qué depende y qué se decidió? |
| Desarrollador | las secciones "Técnica" de contenedor y componentes | ¿Cómo está construido y por dónde cambio algo? |
| Arquitecto | todos los niveles + la decisión | ¿Es coherente y qué trade-offs se asumieron? |

---

## Nivel 1 — Contexto

Documento fuente: [Diagrama de Contexto](../context/diagrama-contexto.md)

### Perspectiva de negocio

El sistema es una herramienta interna que mantiene la documentación de
arquitectura **siempre sincronizada con el código**, porque vive en el mismo
repositorio. Lo usan tres públicos: quien escribe la documentación
(desarrollador), quien define las decisiones (arquitecto) y quien las consulta
para decidir (negocio). No guarda datos de clientes ni ejecuta procesos de
negocio: su valor es reducir el costo de entender el sistema y evitar que la
documentación quede desactualizada.

**Por qué importa:** documentación desactualizada genera decisiones equivocadas y
retrabajo. Al versionarla junto al código, cada cambio técnico puede venir
acompañado de su explicación, y las auditorías o incorporaciones de nuevo
personal son más rápidas.

### Perspectiva técnica

En el nivel de contexto el sistema es una sola caja que interactúa con sistemas
externos: el repositorio Git (fuente de verdad del contenido), el pipeline de
CI/CD (instala, genera diagramas, compila y despliega), el registro npm
(dependencias), el entorno de despliegue (sirve el bundle estático) y una CDN de
fuentes (tipografías e iconos de Material en runtime). No hay backend propio ni
base de datos: el contenido se resuelve en tiempo de build desde archivos.

**Implicación de diseño:** al no tener backend, la seguridad y el estado de datos
sensibles quedan fuera de alcance; el foco técnico está en el build y en servir
estáticos de forma eficiente.

---

## Nivel 2 — Contenedor

Documento fuente: [Diagrama de Contenedores](../container/diagrama-contenedor.md)

### Perspectiva de negocio

El sistema se entrega como una aplicación de una sola página (SPA) que corre en
el navegador del usuario. Durante la preparación de la entrega, un paso
automatizado toma la documentación escrita y la empaqueta junto con la
aplicación. El resultado es un paquete que se publica en un contenedor estándar
(Docker), lo que hace que los despliegues sean **predecibles y reversibles**: si
una versión falla, se vuelve a la anterior en minutos.

**Por qué importa:** menor riesgo operativo y menor costo de hosting, porque
servir archivos estáticos es más barato y simple que operar servidores con lógica
de negocio.

### Perspectiva técnica

Contenedores principales:

- **SPA Angular (navegador):** aplicación standalone (Angular 20) con router,
  componentes de presentación y servicios. Renderiza Markdown y diagramas Mermaid
  en el cliente.
- **Build / generación de diagramas (tiempo de build):** `scripts/generate-diagrams.js`
  extrae los bloques Mermaid de `docs/` y los exporta a `docs/diagrams/`; Angular
  CLI compila el bundle y copia esos diagramas a `assets/`.
- **Almacenamiento de contenido (sistema de archivos del repo):** `docs/` con los
  Markdown por nivel C4 y los ADR.
- **Entorno de despliegue:** imagen Docker que sirve el contenido estático
  resultante.

**Implicación de diseño:** la generación es en build-time, no en runtime. Eso
mantiene el runtime simple a cambio de requerir un re-build para reflejar cambios
de documentación.

---

## Nivel 3 — Componentes

Documento fuente: [Diagrama de Componentes](../components/diagrama-componentes.md)

### Perspectiva de negocio

Internamente la aplicación está organizada en piezas con responsabilidades
separadas: una capa que arma la pantalla y la navegación, piezas visuales
reutilizables, y servicios que cargan el contenido. Esta separación permite que
distintas personas trabajen en paralelo y que agregar una sección nueva sea
rápido y de bajo riesgo, porque los cambios quedan acotados a una pieza.

**Por qué importa:** se traduce en menor tiempo para incorporar cambios y menor
probabilidad de que un ajuste rompa otra parte del producto.

### Perspectiva técnica

Organización por capas (coherente con el scaffolding real del proyecto):

- **`app.component` + `app.routes`:** shell de la aplicación (toolbar, sidenav) y
  ruteo entre los niveles C4.
- **`core/`:** modelo de navegación (`NavigationSection`) y `DocumentationService`
  (carga de documentos vía `HttpClient`).
- **`features/`:** contenedores por página, p. ej. `DiagramPageComponent`, que
  orquestan la vista de cada nivel.
- **`shared/`:** componentes presentacionales reutilizables, p. ej.
  `SectionCardComponent`, sin lógica de datos.

El estado se maneja con **Angular Signals** y servicios inyectables, no con una
librería de estado global (ver la decisión de abajo).

**Implicación de diseño:** el estado compartido vive en servicios `providedIn:
'root'` expuesto como señales de solo lectura; el estado local vive en el
componente que lo usa.

---

## Decisión destacada — Gestión de estado (ADR-002)

Documento fuente: [ADR-002](../decisions/adr-002.md)

### Perspectiva de negocio

Se eligió la solución de gestión de estado **nativa del framework** en lugar de
agregar una librería externa (NgRx). Para un sistema con datos simples, esto
significa **menos dependencias, menor costo de mantenimiento y entregas más
rápidas**. Es una decisión reversible: si el producto creciera en complejidad, se
puede adoptar la librería más adelante sin rehacer todo.

**Trade-off honesto:** se renuncia a herramientas avanzadas de depuración de
estado que aporta la librería externa; se asume a cambio de simplicidad.

### Perspectiva técnica

Se adopta Signals + servicios y se descarta NgRx (que venía como andamiaje vacío
en el código base y se removió en Fase 0). El dominio actual —sección activa,
contenido cargado, estado de navegación— no justifica el boilerplate ni el peso
de un store global. Se pierden Redux DevTools y el flujo unidireccional explícito;
se mitiga con una convención clara de dónde vive cada pieza de estado. La decisión
se re-evalúa si aparece estado compartido complejo o sincronización en tiempo
real.

---

## Tabla puente: un mismo concepto, dos lenguajes

| Concepto técnico | Traducción para negocio |
|------------------|-------------------------|
| SPA servida estática | Aplicación liviana que no necesita servidores con lógica propia |
| Generación de diagramas en build-time | La documentación se empaqueta al preparar cada versión |
| Angular Signals | Mecanismo que actualiza la pantalla solo, sin código manual de sincronización |
| Sin backend / sin base de datos | No almacena datos sensibles; menor superficie de riesgo y costo |
| Contenedor Docker | Paquete estándar que hace los despliegues predecibles y reversibles |
| ADR | Registro escrito del "por qué" de una decisión técnica importante |

## Cómo validar que la comunicación funciona

Para cada público, la documentación cumple su objetivo si puede responder su
pregunta sin leer el material del otro público:

- **Negocio** puede explicar qué hace el sistema, qué valor aporta y qué implica
  la decisión de estado, usando la perspectiva de negocio y la tabla puente.
- **Técnico** puede ubicar dónde cambiar algo (capa `core/features/shared`),
  entender el flujo build-time y los trade-offs del ADR, usando las perspectivas
  técnicas.

## Errores de comunicación que este documento evita

- **Jerga sin traducción:** cada término técnico tiene su equivalente de negocio.
- **Mezclar niveles:** cada sección se mantiene en su nivel de abstracción C4.
- **Inconsistencia con el código:** se describe el sistema real (Angular 20,
  Signals, Mermaid, estático), no un sistema genérico.
- **Datos inventados:** no se afirman métricas de impacto sin fundamento; los
  beneficios se expresan de forma cualitativa y verificable.

---

*Entregable de la Fase 3 (comunicación a diferentes públicos). Dos perspectivas
—técnica y de negocio— por cada nivel del modelo C4 y por la decisión destacada.*
