# Diagrama de Contexto del Sistema

## Descripción General

El diagrama de contexto representa el sistema como una caja negra que interactúa con entidades externas. Este nivel de abstracción muestra la visión de más alto nivel de la arquitectura, enfocándose en las relaciones entre el sistema y su entorno sin detallar la implementación interna.

## Sistema bajo análisis

**Angular Architecture Docs** es una aplicación web desarrollada en Angular 20 que permite documentar y visualizar arquitecturas de software utilizando el modelo C4. La aplicación sirve como herramienta de documentación técnica que genera diagramas interactivos a partir de definiciones declarativas.

## Entidades externas y relaciones

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SISTEMA: Angular Architecture Docs                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │   [Aplicación Web Angular 20]                                      │   │
│  │   - Renderizado de diagramas Mermaid                               │   │
│  │   - Navegación entre niveles C4                                    │   │
│  │   - Gestión de documentación técnica                               │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
           │                          │                           │
           ▼                          ▼                           ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────────┐
│  Desarrolladores    │  │  Arquitectos de     │  │  Stakeholders de        │
│  de Software        │  │  Software           │  │  Negocio                │
│                     │  │                     │  │                         │
│ - Crean diagramas   │  │ - Definen decisiones│  │ - Revisan архитектура  │
│ - Mantienen código  │  │ - Validan patrones  │  │ - Aprueban decisiones   │
│ - Ejecutan pruebas  │  │ - Refactorizan      │  │ - Comunican a equipos   │
└─────────────────────┘  └─────────────────────┘  └─────────────────────────┘
           │                          │                           │
           ▼                          ▼                           ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────────┐
│  Sistemas de        │  │  Repositorio Git    │  │  Entornos de            │
│  Integración        │  │                     │  │  Despliegue             │
│  Continua           │  │ - Almacena código   │  │                         │
│                     │  │ - Versiona ADRs     │  │ - Docker containers     │
│ - Ejecutan builds   │  │ - Gestiona branches │  │ - CI/CD pipelines       │
│ - Validan calidad   │  │                     │  │ - Producción/ staging   │
└─────────────────────┘  └─────────────────────┘  └─────────────────────────┘
```

## Detalle de relaciones

### Desarrolladores de Software

Los desarrolladores interactúan con el sistema para crear y mantener la documentación arquitectónica. Sus necesidades incluyen:

- Acceso a herramientas de generación de diagramas desde el código fuente
- Capacidad de versionar la documentación junto con el código
- Integración con flujos de trabajo de desarrollo existentes
- Validación automática de consistencia entre diagramas y código

### Arquitectos de Software

Los arquitectos utilizan el sistema para comunicar decisiones de diseño y mantener la coherencia arquitectónica. Sus necesidades incluyen:

- Registro estructurado de decisiones arquitectónicas (ADR)
- Visualización de relaciones entre componentes
- Documentación de patrones y antipatrones identificados
- Trazabilidad entre requisitos y decisiones de implementación

### Stakeholders de Negocio

Los stakeholders no técnicos requieren acceso a la documentación en formatos comprensibles. Sus necesidades incluyen:

- Resúmenes ejecutivos de la arquitectura
- Diagramas simplificados sin jargon técnico
- Explicación del impacto de decisiones técnicas en el negocio
- Información sobre tiempos de desarrollo y costos de mantenimiento

### Sistemas de Integración Continua

Los pipelines de CI interactúan con el sistema para automatizar la generación de documentación. Los flujos incluyen:

- Generación de diagramas durante el proceso de build
- Validación de sintaxis de archivos Mermaid
- Publicación automática de documentación actualizada
- Verificación de enlacesrotos entre componentes documentados

### Repositorio Git

El repositorio de código fuente sirve como fuente de verdad para la documentación. La relación incluye:

- Almacenamiento de archivos de definición de diagramas
- Historial de cambios en decisiones arquitectónicas
- Ramas de trabajo para propuestas de cambio arquitectónico
- Revisión de código para modificaciones en la documentación

### Entornos de Despliegue

Los entornos de ejecución donde la aplicación opera incluyen:

- Contenedores Docker para despliegue reproducible
- Configuraciones de producción y staging
- Variables de entorno para personalización
- Certificados y configuraciones de seguridad

## Tecnologías involucradas

| Tecnología | Rol | Versión |
|------------|-----|---------|
| Angular 20 | Framework de la aplicación | 20.0.0 |
| Mermaid | Generación de diagramas | 10.9.0 |
| TypeScript | Lenguaje de programación | 5.8.0 |
| Node.js | Runtime de ejecución | 20.x |
| Docker | Contenedorización | Latest |

## Nivel de abstracción

Este diagrama representa el nivel más alto del modelo C4 (Contexto). En él se muestra:

- El sistema completo como una única unidad
- Personas que interactúan con el sistema
- Otros sistemas con los que el sistema se integra
- Clear boundaries que definen el alcance del sistema

## Siguiente nivel

Para details sobre cómo el sistema se estructura internamente y qué contenedores lo componen, consulte el [Diagrama de Contenedores](../container/diagrama-contenedor.md).

---

*Generado automáticamente por Angular Architecture Docs. Para actualizar este diagrama, modify los archivos fuente en `docs/context/`.*