import { Routes } from '@angular/router';
import { DiagramPageComponent } from './features/diagram-page/diagram-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'context', pathMatch: 'full' },
  { path: 'context', component: DiagramPageComponent, data: { level: 'context' } },
  { path: 'container', component: DiagramPageComponent, data: { level: 'container' } },
  { path: 'component', component: DiagramPageComponent, data: { level: 'component' } },
  { path: 'decisions', component: DiagramPageComponent, data: { level: 'decision' } },
  { path: '**', redirectTo: 'context' }
];
