# Documentar arquitectura de software multinivel

El candidato debe documentar una arquitectura de software compleja que incluya sistemas, personas, componentes, contenedores y sus relaciones. La documentación debe ser clara y accesible para diferentes públicos, incluyendo técnicos y no técnicos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Documentación de arquitecturas de software |
| **Nivel** | master-l3 |
| **Tipo** | practical |
| **Tiempo estimado** | 15 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Exploración del sistema

**Objetivo:** Identificar y documentar los componentes y relaciones clave del sistema.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Enumera todos los componentes y sistemas involucrados en la arquitectura.
- Identifica las relaciones entre los componentes y sistemas.
- Documenta las responsabilidades y restricciones de cada componente.

**Entregable:** Diagrama de contexto que muestra los sistemas, personas, componentes y contenedores, junto con sus relaciones.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las diferentes audiencias y cómo se pueden comunicar de manera efectiva los conceptos técnicos.
- Piensa en cómo las restricciones y responsabilidades de los componentes pueden afectar las relaciones entre ellos.

</details>

### Fase 2: Evaluación de decisiones de diseño

**Objetivo:** Evaluar y documentar una decisión de diseño controversial.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Identifica una decisión de diseño controversial en la arquitectura.
- Evalúa los pros y contras de la decisión.
- Documenta la decisión, incluyendo el contexto, las fuerzas involucradas, las opciones consideradas, la decisión tomada y las consecuencias.

**Entregable:** Registro de decisión que documenta una decisión de diseño controversial, incluyendo contexto, fuerzas, opciones, decisión y consecuencias.

<details>
<summary>Pistas de conocimiento</summary>

- Considera los trade-offs y las implicaciones de la decisión para diferentes partes interesadas.
- Piensa en cómo comunicar efectivamente la decisión a diferentes públicos.

</details>

### Fase 3: Comunicación a diferentes públicos

**Objetivo:** Comunicar la arquitectura y las decisiones de diseño a diferentes públicos.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Crea documentación adaptada a diferentes públicos, incluyendo técnicos y no técnicos.
- Asegúrate de que la documentación sea clara y accesible para cada público.
- Valida que cada público pueda tomar decisiones informadas basadas en la documentación.

**Entregable:** Documentación adaptada a diferentes públicos, incluyendo al menos dos perspectivas por nivel de abstracción (técnica y negocio).

<details>
<summary>Pistas de conocimiento</summary>

- Considera las diferentes necesidades y niveles de conocimiento de cada público.
- Piensa en cómo hacer que la documentación sea accesible y comprensible para todos.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un diagrama de contexto y por qué es importante en la documentación de arquitecturas?
- **paraQueSirve**: ¿Para qué sirve un registro de decisión y cómo ayuda en la comunicación de decisiones de diseño?
- **comoSeUsa**: ¿Cómo se usa la documentación adaptada para comunicar arquitecturas a diferentes públicos?
- **erroresComunes**: ¿Cuáles son los errores comunes al documentar arquitecturas y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la documentación de una arquitectura y cómo se pueden justificar?

## Criterios de Evaluacion

- Documentar correctamente los componentes y relaciones del sistema.
- Evaluar y documentar una decisión de diseño controversial.
- Crear documentación adaptada a diferentes públicos.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
