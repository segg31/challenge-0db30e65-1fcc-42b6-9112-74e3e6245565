import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NAVIGATION_SECTIONS } from './core/models/navigation.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary" class="app-toolbar">
      <button mat-icon-button (click)="toggleSidenav()" aria-label="Alternar menu de navegacion">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Documentacion de Arquitectura - C4 Model</span>
    </mat-toolbar>

    <mat-sidenav-container class="app-container">
      <mat-sidenav #sidenav mode="side" [opened]="sidenavOpen" class="app-sidenav">
        <mat-nav-list>
          @for (section of sections; track section.path) {
            <a
              mat-list-item
              [routerLink]="section.path"
              routerLinkActive="active-link"
            >
              <mat-icon matListItemIcon>{{ section.icon }}</mat-icon>
              <span matListItemTitle>{{ section.label }}</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="app-content">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .app-toolbar { position: sticky; top: 0; z-index: 10; }
    .app-toolbar span { margin-left: 0.5rem; }
    .app-container { height: calc(100vh - 64px); }
    .app-sidenav { width: 260px; padding-top: 0.5rem; }
    .app-content { padding: 1.5rem; }
    .active-link { background: rgba(0, 0, 0, 0.06); }
  `]
})
export class AppComponent {
  protected readonly sections = NAVIGATION_SECTIONS;
  protected sidenavOpen = true;

  protected toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
