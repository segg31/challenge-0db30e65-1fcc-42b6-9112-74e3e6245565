# Diagrama de Componentes

## Descripción del nivel

El diagrama de componentes muestra la estructura interna de un contenedor específico, detalhando los componentes de software que lo forman y sus relaciones. Este nivel revela las responsabilidades分配 внутри приложения и то, как los componentes colaboran para cumplir los objetivos del sistema.

## Enfoque del diagrama

Este diagrama se centra en el **contenedor principal**: la Aplicación Angular SPA que constituye el frontend de Angular Architecture Docs. Este contenedor es el más complejo y contiene la mayor parte de la lógica de presentación y renderizado de diagramas.

## Componentes de la aplicación

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        Angular Architecture Docs                                │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Capa de Presentación                                 │   │
│  │                                                                          │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │  LayoutComponent│  │  HeaderComponent│  │  SidebarComponent      │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ - Estructura    │  │ - Navegación    │  │ - Árbol de navegación  │ │   │
│  │  │ - Grid layout   │  │ - Logo          │  │ - Categorías           │ │   │
│  │  │ - Responsive    │  │ - User menu     │  │ - Filtros              │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                          │
│                                      ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Capa de Funcionalidad                               │   │
│  │                                                                          │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │ DiagramViewer   │  │ DocViewer       │  │ AdrViewer               │ │   │
│  │  │ Component       │  │ Component       │  │ Component               │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ - Render Mermaid│  │ - Parse MD      │  │ - List ADRs             │ │   │
│  │  │ - Zoom/Pan      │  │ - Syntax highlight│ │ - Filter by status   │ │   │
│  │  │ - Export SVG    │  │ - Code blocks   │  │ - Search               │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                          │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │ NavigationSvc   │  │ DiagramService  │  │ AdrService              │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ - Route mgmt    │  │ - Load diagram  │  │ - Fetch ADRs            │ │   │
│  │  │ - Breadcrumbs   │  │ - Parse Mermaid │  │ - Parse markdown        │ │   │
│  │  │ - Deep linking  │  │ - Validate      │  │ - Format for display    │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                          │
│                                      ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Capa de Datos                                        │   │
│  │                                                                          │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │ HttpClient      │  │ FileLoader      │  │ CacheManager            │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ - GET requests  │  │ - Fetch local   │  │ - In-memory cache       │ │   │
│  │  │ - Error handle  │  │ - Parse content │  │ - TTL management        │ │   │
│  │  │ - Interceptors  │  │ - MIME detection│  │ - Invalidation          │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                          │
│                                      ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                    Capa de Utilidades                                   │   │
│  │                                                                          │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ │   │
│  │  │ MarkdownParser  │  │ MermaidRenderer │  │ Logger                  │ │   │
│  │  │                 │  │                 │  │                         │ │   │
│  │  │ - Parse MD to   │  │ - Initialize    │  │ - Log levels            │ │   │
│  │  │   AST           │  │   Mermaid       │  │ - Console output        │ │   │
│  │  │ - Extract meta  │  │ - Render to SVG │  │ - Error tracking        │ │   │
│  │  │ - Sanitize      │  │ - Export        │  │ - Analytics             │ │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Detalle de componentes

### Capa de Presentación

#### LayoutComponent

**Responsabilidad:** Estructura principal de la aplicación, define el grid de navegación y regiones de contenido.

**Responsibilities:**
- Contenedor raíz de la aplicación
- Define regiones: header, sidebar, content, footer
- Maneja responsive breakpoints
- Coordina cambios de layout

**Dependencias:** HeaderComponent, SidebarComponent, RouterOutlet

#### HeaderComponent

**Responsabilidad:** Barra de navegación superior con logo, menús y acciones de usuario.

**Características:**
- Logo de la aplicación
- Menú de navegación principal
- Indicador de entorno (dev/staging/prod)
- Menú de usuario dropdown
- Búsqueda global

**Dependencias:** NavigationSvc, UserContext

#### SidebarComponent

**Responsabilidad:** Panel lateral con navegación jerárquica y filtros.

**Características:**
- Árbol de navegación por categorías
- Filtros por tipo de diagrama
- Indicador de sección activa
- Collapsible groups

**Dependencias:** NavigationSvc, Router

### Capa de Funcionalidad

#### DiagramViewerComponent

**Responsabilidad:** Visualización interactiva de diagramas Mermaid con capacidades de zoom, pan y exportación.

**Características:**
- Renderizado de diagramas desde texto Mermaid
- Zoom in/out con scroll y botones
- Pan con drag and drop
- Exportación a SVG/PNG
- Modo pantalla completa
- Sincronización de highlight con scroll

**Dependencias:** MermaidRenderer, DiagramService, ZoomService

#### DocViewerComponent

**Responsabilidad:** Renderizado de documentación Markdown con highlighting de código y navegación interna.

**Características:**
- Parseo de Markdown a HTML
- Syntax highlighting para bloques de código
- Tablas estilizadas
- Links con navegación SPA
- Tabla de contenidos automática
- Breadcrumbs dinámicos

**Dependencias:** MarkdownParser, DocService, TocGenerator

#### AdrViewerComponent

**Responsabilidad:** Visualización y gestión de Architecture Decision Records.

**Características:**
- Listado de ADRs con filtros
- Vista detallada de cada ADR
- Estados: proposed, accepted, deprecated, superseded
- Histórico de cambios
- Búsqueda full-text
- Export a diferentes formatos

**Dependencias:** AdrService, MarkdownParser

#### NavigationService

**Responsabilidad:** Gestión centralizada de navegación y rutas de la aplicación.

**API pública:**

```typescript
interface NavigationService {
  navigateToDiagram(diagramId: string): Promise<void>;
  navigateToDoc(docPath: string): Promise<void>;
  getBreadcrumbs(): Observable<Breadcrumb[]>;
  getCurrentRoute(): string;
  deepLink(path: string): Promise<void>;
}
```

#### DiagramService

**Responsabilidad:** Carga, validación y procesamiento de definiciones de diagramas.

**API pública:**

```typescript
interface DiagramService {
  loadDiagram(path: string): Promise<DiagramDefinition>;
  validateSyntax(mermaidCode: string): ValidationResult;
  renderToSvg(definition: DiagramDefinition): Promise<string>;
  getDiagramMetadata(path: string): Promise<DiagramMetadata>;
  listDiagrams(category?: string): Promise<DiagramSummary[]>;
}
```

#### AdrService

**Responsabilidad:** Consultas y manipulación de registros de decisiones arquitectónicas.

**API pública:**

```typescript
interface AdrService {
  getAllAdrs(): Promise<Adr[]>;
  getAdrById(id: string): Promise<Adr>;
  searchAdrs(query: string): Promise<Adr[]>;
  filterByStatus(status: AdrStatus): Promise<Adr[]>;
  getAdrHistory(id: string): Promise<AdrHistory[]>;
}
```

### Capa de Datos

#### HttpClient

**Responsabilidad:** Cliente HTTP centralizado para todas las comunicaciones con el servidor.

**Características:**
- Configuración de headers
- Manejo de errores centralizado
- Retry logic con exponential backoff
- Request/response interceptors
- Timeout configuración
- Loading states

#### FileLoader

**Responsabilidad:** Carga de archivos locales y remotos, detección de tipo MIME.

**Características:**
- Fetch de archivos del sistema de archivos
- Cacheo en memoria
- Detección de encoding
- Streaming para archivos grandes
- Fallback para errores de red

#### CacheManager

**Responsabilidad:** Gestión de caché en memoria para optimizar carga de documentos.

**Características:**
- TTL configurable por tipo de contenido
- Invalidación manual y automática
- Máximo tamaño de caché
- Persistencia en localStorage (opcional)
- Metrics de hit/miss

### Capa de Utilidades

#### MarkdownParser

**Responsabilidad:** Conversión de Markdown a HTML con extensiones personalizadas.

**Características:**
- Soporte CommonMark + GFM
- Custom extensions para diagramas
- Sanitización de HTML
- Extracción de metadata
- Table of contents generation

#### MermaidRenderer

**Responsabilidad:** Wrapperaround Mermaid.js para renderizado de diagramas.

**Características:**
- Inicialización lazily de Mermaid
- Theme customization
- Error handling robusto
- SVG output
- Lazy rendering para performance

#### Logger

**Responsabilidad:** Sistema de logging estructurado para debugging y analytics.

**Características:**
- Log levels: debug, info, warn, error
- Console y remote transport
- Structured JSON logging
- Error tracking integration
- Performance metrics

## Flujos de datos principales

### Flujo 1: Carga y renderizado de diagrama

```
Usuario solicita diagrama
         │
         ▼
DiagramViewerComponent.onInit()
         │
         ▼
DiagramService.loadDiagram(path)
         │
         ├──▶ FileLoader.fetch(path)
         │           │
         │           ▼
         │    CacheManager.get(key)
         │           │
         │    [HIT] ◀────┘
         │           │
         │    [MISS]
         │           │
         ▼           ▼
DiagramService.validateSyntax()
         │
         ▼
MermaidRenderer.renderToSvg()
         │
         ▼
DiagramViewerComponent.render()
         │
         ▼
Usuario ve el diagrama
```

### Flujo 2: Visualización de ADR

```
Usuario navega a ADRs
         │
         ▼
AdrViewerComponent.onInit()
         │
         ▼
AdrService.getAllAdrs()
         │
         ├──▶ FileLoader.fetch('/docs/decisions/*.md')
         │
         ▼
MarkdownParser.parse(markdown)
         │
         ▼
AdrViewerComponent.render(list)
         │
         ▼
Usuario ve lista de ADRs
```

## Gestión de estado

La aplicación utiliza **Angular Signals** para gestión de estado reactivo. Los signals principales son:

| Signal | Tipo | Descripción |
|--------|------|-------------|
| `currentDiagram` | WritableSignal<Diagram> | Diagrama actualmente visualizado |
| `diagramList` | Signal<DiagramSummary[]> | Lista de todos los diagramas |
| `adrList` | Signal<Adr[]> | Lista de ADRs cargados |
| `loadingState` | Signal<LoadingState> | Estado global de carga |
| `errorState` | Signal<Error | null> | Error actual si existe |

## Consideraciones de arquitectura

### Separación de responsabilidades

Cada capa tiene responsabilidades claramente definidas:

- **Presentación:** Solo renderizado y captura de eventos del usuario
- **Funcionalidad:**Orquestación de casos de uso y coordinación de servicios
- **Datos:** Abstracción de fuentes de datos y caché
- **Utilidades:** Funciones puras de transformación

### Inyección de dependencias

Todos los servicios se injectan via constructor usando el sistema de DI de Angular:

```typescript
@Component({...})
export class DiagramViewerComponent {
  constructor(
    private diagramService: DiagramService,
    private mermaidRenderer: MermaidRenderer,
    private logger: Logger,
    private cdr: ChangeDetectorRef
  ) {}
}
```

### Performance

- **Lazy loading** de diagramas grandes
- **OnPush** change detection en todos los componentes
- **Virtual scrolling** para listas largas
- **Memoization** de resultados de parseo
- **Web Workers** para renderizado de diagramas complejos (futuro)

---

*Este diagrama representa el nivel 3 (Componentes) del modelo C4, enfocándose en la aplicación Angular SPA.*