import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * Componente presentacional (capa shared) que muestra una tarjeta con el
 * titulo y la descripcion de una seccion de documentacion.
 *
 * No conoce fuentes de datos ni logica de negocio: solo recibe entradas y
 * renderiza. Es reutilizable por cualquier contenedor de la capa de features.
 */
@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="section-card">
      <mat-card-header>
        <mat-icon mat-card-avatar>{{ icon }}</mat-icon>
        <mat-card-title>{{ title }}</mat-card-title>
        @if (subtitle) {
          <mat-card-subtitle>{{ subtitle }}</mat-card-subtitle>
        }
      </mat-card-header>
      <mat-card-content>
        <p>{{ description }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .section-card { max-width: 720px; margin: 0 auto; }
    .section-card p { line-height: 1.6; }
  `]
})
export class SectionCardComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
  @Input() description = '';
  @Input() icon = 'description';
}
