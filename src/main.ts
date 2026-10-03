import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { provideMermaid } from 'ng-mermaid';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

interface AppConfig {
  production: boolean;
  apiUrl: string;
  documentationPath: string;
}

class AppBootstrapper {
  private readonly config: AppConfig;
  private readonly materialModules: any[] = [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ];

  constructor() {
    this.config = {
      production: environment.production,
      apiUrl: environment.apiUrl || 'http://localhost:3000/api',
      documentationPath: environment.documentationPath || './docs'
    };
    this.validateConfig();
  }

  private validateConfig(): void {
    if (!this.config.apiUrl || this.config.apiUrl.trim() === '') {
      throw new Error('API URL is required in the application configuration.');
    }
    if (!this.config.documentationPath || this.config.documentationPath.trim() === '') {
      throw new Error('Documentation path is required in the application configuration.');
    }
  }

  public getProviders(): any[] {
    return [
      provideRouter(routes),
      provideAnimationsAsync(),
      provideHttpClient(withFetch()),
      importProvidersFrom(this.materialModules),
      provideMermaid(),
      { provide: 'APP_CONFIG', useValue: this.config }
    ];
  }

  public bootstrap(): void {
    bootstrapApplication(AppComponent, {
      providers: this.getProviders()
    }).catch(err => {
      console.error('Application bootstrap failed:', err);
      throw err;
    });
  }
}

// Bootstrap the application
const bootstrapper = new AppBootstrapper();
bootstrapper.bootstrap();