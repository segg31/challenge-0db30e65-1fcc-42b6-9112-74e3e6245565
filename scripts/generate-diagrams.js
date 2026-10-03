/**
 * generate-diagrams.js
 *
 * Script de andamiaje para la generacion de diagramas del proyecto.
 *
 * Recorre los archivos Markdown de la carpeta `docs/`, extrae los bloques de
 * codigo Mermaid (```mermaid ... ```) y escribe un indice con los diagramas
 * encontrados en `docs/diagrams/`. Los diagramas quedan versionados junto a la
 * documentacion de la que provienen.
 *
 * Se invoca via `npm run generate:docs`.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const OUTPUT_DIR = path.join(ROOT, 'docs', 'diagrams');

const MERMAID_BLOCK = /```mermaid\s*([\s\S]*?)```/g;

/** Recorre un directorio de forma recursiva y devuelve los archivos .md. */
function collectMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.reduce((files, entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return files.concat(collectMarkdownFiles(fullPath));
    }
    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
    return files;
  }, []);
}

/** Extrae los bloques Mermaid de un contenido Markdown. */
function extractMermaidBlocks(content) {
  const blocks = [];
  let match;
  while ((match = MERMAID_BLOCK.exec(content)) !== null) {
    const definition = match[1].trim();
    if (definition.length > 0) {
      blocks.push(definition);
    }
  }
  return blocks;
}

function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const markdownFiles = collectMarkdownFiles(DOCS_DIR);
  const index = [];

  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const blocks = extractMermaidBlocks(content);
    if (blocks.length === 0) {
      continue;
    }

    const relative = path.relative(DOCS_DIR, file);
    const baseName = relative.replace(/[\\/]/g, '-').replace(/\.md$/, '');

    blocks.forEach((definition, i) => {
      const fileName = blocks.length > 1 ? `${baseName}-${i + 1}.mmd` : `${baseName}.mmd`;
      const outputPath = path.join(OUTPUT_DIR, fileName);
      fs.writeFileSync(outputPath, `${definition}\n`, 'utf8');
      index.push({ source: relative, diagram: fileName });
    });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.json'),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), diagrams: index }, null, 2)}\n`,
    'utf8'
  );

  console.log(`[generate:docs] ${index.length} diagrama(s) exportado(s) a ${path.relative(ROOT, OUTPUT_DIR)}`);
}

main();
