import { Component, Input } from '@angular/core';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { C4Level, NAVIGATION_SECTIONS } from '../../core/models/navigation.model';

/**
 * Contenedor (capa features) que representa una pagina de un nivel del modelo
 * C4. Recibe el nivel por binding de entrada del router y delega el renderizado
 * en el componente presentacional de la capa shared.
 *
 * El andamiaje muestra el encabezado de la seccion. El contenido real de cada
 * diagrama es parte del trabajo del reto y no se implementa aqui.
 */
@Component({
  selector: 'app-diagram-page',
  standalone: true,
  imports: [SectionCardComponent],
  template: `
    <app-section-card
      [title]="currentSection.label"
      subtitle="Modelo C4"
      [icon]="currentSection.icon"
      [description]="placeholder"
    />
  `
})
export class DiagramPageComponent {
  /** Nivel C4 inyectado desde la configuracion de rutas. */
  @Input() level: C4Level = 'context';

  protected readonly placeholder =
    'Esta seccion forma parte de los entregables del reto. Agrega aqui el ' +
    'contenido correspondiente a este nivel del modelo C4.';

  protected get currentSection() {
    return (
      NAVIGATION_SECTIONS.find(section => section.level === this.level) ??
      NAVIGATION_SECTIONS[0]
    );
  }
}
