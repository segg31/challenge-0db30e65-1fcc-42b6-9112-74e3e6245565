# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Documentar arquitectura de software multinivel**.

| | |
|---|---|
| Tema | Documentación de arquitecturas de software |
| Nivel | master-l3 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript 5.8 / Angular 20 |
| Patron arquitectonico | Documentación arquitectónica con C4 Model y herramientas de visualización |
| Tiempo estimado | 15 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 20.0.0
- @angular/common 20.0.0
- @angular/platform-browser 20.0.0
- @angular/router 20.0.0
- @angular/material 17.0.0
- rxjs 7.8.0
- typescript 5.8.0
- mermaid 10.9.0
- docker n/a
- Node.js 20.0.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Exploración del sistema**: Diagrama de contexto que muestra los sistemas, personas, componentes y contenedores, junto con sus relaciones.
- **Fase 2 — Evaluación de decisiones de diseño**: Registro de decisión que documenta una decisión de diseño controversial, incluyendo contexto, fuerzas, opciones, decisión y consecuencias.
- **Fase 3 — Comunicación a diferentes públicos**: Documentación adaptada a diferentes públicos, incluyendo al menos dos perspectivas por nivel de abstracción (técnica y negocio).

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `docker/Dockerfile` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `docker/docker-compose.yml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.

## Lo que falta y tenes que completar

### 1. Referencias colgando (1)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `package.json` — `typescript@5.8.0`
      typescript declara la version 5.8.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (16)

- `package.json`
- `angular.json`
- `tsconfig.json`
- `src/main.ts`
- `src/index.html`
- `src/app/app.config.ts`
- `docs/context/diagrama-contexto.md`
- `docs/container/diagrama-contenedor.md`
- `docs/components/diagrama-componentes.md`
- `docs/decisions/adr-001.md`
- `docs/public/guia-tecnica.md`
- `docs/public/guia-negocio.md`
- `docker/Dockerfile`
- `docker/docker-compose.yml`
- `docker/.dockerignore`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `docs`
- `docs/context`
- `docs/container`
- `docs/components`
- `docs/decisions`
- `docs/public`
- `src`
- `src/app`
- `src/app/core`
- `src/app/features`
- `src/app/shared`
- `src/assets`
- `docker`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **Documentación arquitectónica con C4 Model y herramientas de visualización**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Master
- Brecha que el reto ataca: Ha comunicado decisiones de arquitectura, sistemas, personas, componentes, contenedores y relaciones a diferentes públicos mediante diagramas (C4, UML, Archimate, ..., etc)
- Mision: Candidato con experiencia avanzada en arquitectura de software

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
