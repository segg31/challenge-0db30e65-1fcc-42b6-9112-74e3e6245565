# Diagrama de Contenedores

## Descripción del nivel

El diagrama de contenedores muestra la estructura de alto nivel del sistema, detalhando los procesos en ejecución que lo componen. Cada contenedor representa una unidad desplegable independiente que opera dentro del sistema global. Este nivel revela la arquitectura de distribución y los mecanismos de comunicación entre componentes.

## Contenedores del sistema

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        Angular Architecture Docs                                │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                     Navegador Web (Cliente)                             │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │   │
│  │  │  Aplicación Angular SPA                                         │   │   │
│  │  │                                                                  │   │   │
│  │  │  [Router] ──────▶ [DiagramRenderer] ──────▶ [DocViewer]        │   │   │
│  │  │       │                   │                      │              │   │   │
│  │  │       └───────────────────┴──────────────────────┘              │   │   │
│  │  │                              │                                   │   │   │
│  │  │                              ▼                                   │   │   │
│  │  │                     [StateManager (Signals)]                    │   │   │
│  │  │                                                                  │   │   │
│  │  └─────────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                          │
│                           HTTP/REST │                                          │
│                                      ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                     Servidor de Aplicación                              │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │   │
│  │  │  Angular Universal (SSR) - Opcional                             │   │   │
│  │  │  - Renderizado del lado del servidor                            │   │   │
│  │  │  - SEO optimization                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                          │
│                           Lectura de archivos                                   │
│                                      ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                     Sistema de Archivos Local                          │   │
│  │                                                                          │   │
│  │  /docs/context/      - Diagramas de contexto                           │   │
│  │  /docs/container/   - Diagramas de contenedores                        │   │
│  │  /docs/components/  - Diagramas de componentes                         │   │
│  │  /docs/decisions/   - Registros de decisiones (ADR)                    │   │
│  │  /docs/public/      - Documentación para usuarios finales              │   │
│  │                                                                          │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                     Servicios Externos                                 │   │
│  │                                                                          │   │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────────┐   │   │
│  │  │ GitHub/GitLab    │  │ Mermaid Live     │  │ Docker Registry    │   │   │
│  │  │ (Versionado)     │  │ (Validación)     │  │ (Despliegue)       │   │   │
│  │  └──────────────────┘  └──────────────────┘  └────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Detalle de contenedores

### Navegador Web - Aplicación Angular SPA

**Tipo:** Single Page Application  
**Tecnología:** Angular 20 con TypeScript 5.8  
**Responsabilidad:** Interfaz de usuario para visualización y creación de diagramas arquitectónicos

**Componentes internos:**

| Componente | Responsabilidad | Tecnología |
|------------|-----------------|------------|
| Router | Navegación entre vistas y niveles C4 | Angular Router |
| DiagramRenderer | Renderizado de diagramas Mermaid | Mermaid.js |
| DocViewer | Visualización de documentación Markdown | angular-markdown |
| StateManager | Gestión de estado reactivo | Angular Signals |

**Puertos expuestos:**

- `HTTP 80/443` - Interfaz web para usuarios
- `WebSocket` - Actualizaciones en tiempo real (opcional)

### Servidor de Aplicación - Angular Universal

**Tipo:** Servidor de renderizado side-server  
**Tecnología:** Angular Universal (SSR)  
**Responsabilidad:** Renderizado inicial para mejora de performance y SEO

**Características opcionales:**

- Pre-renderizado de páginas estáticas
- Streaming de respuestas
- Hydration parcial para contenido estático

### Sistema de Archivos Local

**Tipo:** Almacenamiento de archivos estáticos  
**Tecnología:** Sistema de archivos del sistema operativo  
**Responsabilidad:** Persistencia de documentación y definiciones de diagramas

**Estructura de directorios:**

```
docs/
├── context/
│   └── diagrama-contexto.md      # Nivel 1: Contexto del sistema
├── container/
│   └── diagrama-contenedor.md    # Nivel 2: Contenedores
├── components/
│   └── diagrama-componentes.md   # Nivel 3: Componentes
├── decisions/
│   ├── adr-001.md                # Decisión arquitectónica 001
│   └── adr-002.md                # Decisión arquitectónica 002
└── public/
    ├── guia-tecnica.md           # Documentación técnica
    └── guia-negocio.md           # Documentación de negocio
```

## Comunicación entre contenedores

### Flujo principal: Usuario visualiza diagrama

1. Usuario accede a la aplicación desde el navegador
2. Angular Router determina la ruta solicitada
3. DiagramRenderer carga la definición Mermaid del sistema de archivos
4. Mermaid procesa la definición y genera el diagrama
5. El diagrama renderizado se muestra al usuario

### Flujo de actualización de documentación

1. Desarrollador modifica archivo en el repositorio Git
2. Pipeline de CI detecta el cambio
3. Se ejecuta validación de sintaxis Mermaid
4. La aplicación se redepliega con los cambios
5. Los usuarios ven la documentación actualizada

### Integración con servicios externos

| Servicio | Protocolo | Propósito |
|----------|-----------|-----------|
| GitHub/GitLab | Git/HTTPS | Versionado de documentación |
| Mermaid Live | HTTPS | Validación de diagramas |
| Docker Registry | HTTPS | Distribución de imágenes |

## Tecnologías por contenedor

| Contenedor | Imagen Base | Puertos | Recursos |
|------------|-------------|---------|----------|
| Angular App | node:20-alpine | 80, 443 | CPU: 0.5, Mem: 512MB |
| Angular SSR | node:20-alpine | 3000 | CPU: 1.0, Mem: 1GB |

## Consideraciones de despliegue

### Contenedores Docker

La aplicación se despliega como contenedor Docker standalone. El contenedor incluye:

- Runtime de Node.js 20
- Aplicación Angular buildada
- Servidor estático para archivos de documentación
- Configuración de variables de entorno

### Escalabilidad

- **Horizontal:** Múltiples instancias del contenedor detrás de un load balancer
- **Vertical:** Aumento de recursos del contenedor según demanda
- **CDN:** Distribución de archivos estáticos a través de CDN para reducir latencia

## Siguiente nivel

Para detalles sobre los componentes internos de la aplicación Angular, consulte el [Diagrama de Componentes](../components/diagrama-componentes.md).

---

*Este diagrama representa el nivel 2 (Contenedores) del modelo C4.*