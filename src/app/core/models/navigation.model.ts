/**
 * Modelo de navegacion de la aplicacion.
 *
 * Describe las secciones del modelo C4 que la aplicacion expone en el menu
 * lateral. Cada seccion mapea a una ruta y a un documento de la carpeta `docs/`.
 */

/** Nivel de abstraccion del modelo C4 que representa una seccion. */
export type C4Level = 'context' | 'container' | 'component' | 'decision' | 'public';

/** Una seccion navegable de la documentacion. */
export interface NavigationSection {
  /** Ruta relativa usada por el router de Angular. */
  readonly path: string;
  /** Etiqueta visible en el menu. */
  readonly label: string;
  /** Nombre del icono de Material a mostrar. */
  readonly icon: string;
  /** Nivel C4 asociado a la seccion. */
  readonly level: C4Level;
}

/** Secciones por defecto que componen la navegacion del sistema. */
export const NAVIGATION_SECTIONS: readonly NavigationSection[] = [
  { path: '/context', label: 'Contexto', icon: 'public', level: 'context' },
  { path: '/container', label: 'Contenedores', icon: 'view_quilt', level: 'container' },
  { path: '/component', label: 'Componentes', icon: 'account_tree', level: 'component' },
  { path: '/decisions', label: 'Decisiones (ADR)', icon: 'gavel', level: 'decision' }
];
