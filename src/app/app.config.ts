import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

interface FeatureFlags {
  enableExperimentalFeatures: boolean;
  enableDarkMode: boolean;
  enableNotifications: boolean;
  enableOfflineMode: boolean;
}

interface AppEnvironment {
  production: boolean;
  apiUrl: string;
  assetsUrl: string;
  version: string;
  buildTimestamp: string;
  featureFlags: FeatureFlags;
}

const APP_CONFIG_TOKEN = 'APP_CONFIG';
const ENVIRONMENT_TOKEN = 'APP_ENVIRONMENT';

function loadEnvironment(): AppEnvironment {
  const env: AppEnvironment = {
    production: !isDevMode(),
    apiUrl: isDevMode() ? 'http://localhost:3000/api' : '/api',
    assetsUrl: isDevMode() ? 'http://localhost:3000/assets' : '/assets',
    version: '1.0.0',
    buildTimestamp: new Date().toISOString(),
    featureFlags: {
      enableExperimentalFeatures: false,
      enableDarkMode: true,
      enableNotifications: true,
      enableOfflineMode: false
    }
  };
  return env;
}

class ConfigurationService {
  private readonly environment: AppEnvironment;
  private readonly configCache = new Map<string, unknown>();

  constructor() {
    this.environment = loadEnvironment();
  }

  getEnvironment(): Readonly<AppEnvironment> {
    return Object.freeze({ ...this.environment });
  }

  isProduction(): boolean {
    return this.environment.production;
  }

  getApiUrl(): string {
    return this.environment.apiUrl;
  }

  getAssetsUrl(): string {
    return this.environment.assetsUrl;
  }

  getVersion(): string {
    return this.environment.version;
  }

  isFeatureEnabled(flag: keyof FeatureFlags): boolean {
    return this.environment.featureFlags[flag] ?? false;
  }

  getConfig<T>(key: string, defaultValue: T): T {
    if (this.configCache.has(key)) {
      return this.configCache.get(key) as T;
    }
    return defaultValue;
  }

  setConfig<T>(key: string, value: T): void {
    this.configCache.set(key, value);
  }
}

function createConfigurationService(): ConfigurationService {
  return new ConfigurationService();
}

class LoggerService {
  private readonly logs: Array<{ timestamp: Date; level: string; message: string; context?: string }> = [];
  private readonly maxLogs = 1000;
  private readonly minLevel: 'debug' | 'info' | 'warn' | 'error' = 'info';

  private readonly levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  private shouldLog(level: string): boolean {
    return this.levels[level as keyof typeof this.levels] >= this.levels[this.minLevel];
  }

  private formatMessage(level: string, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}] ` : '';
    return `[${timestamp}] ${level.toUpperCase()} ${contextStr}${message}`;
  }

  private addLog(level: string, message: string, context?: string): void {
    if (!this.shouldLog(level)) return;

    const logEntry = {
      timestamp: new Date(),
      level,
      message,
      context
    };

    this.logs.push(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    const formatted = this.formatMessage(level, message, context);
    switch (level) {
      case 'error':
        console.error(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'debug':
        console.debug(formatted);
        break;
      default:
        console.log(formatted);
    }
  }

  debug(message: string, context?: string): void {
    this.addLog('debug', message, context);
  }

  info(message: string, context?: string): void {
    this.addLog('info', message, context);
  }

  warn(message: string, context?: string): void {
    this.addLog('warn', message, context);
  }

  error(message: string, context?: string): void {
    this.addLog('error', message, context);
  }

  getLogs(): ReadonlyArray<{ timestamp: Date; level: string; message: string; context?: string }> {
    return Object.freeze([...this.logs]);
  }

  clearLogs(): void {
    this.logs.length = 0;
  }

  exportLogs(): string {
    return this.logs.map(log => this.formatMessage(log.level, log.message, log.context)).join('\n');
  }
}

function createLoggerService(): LoggerService {
  return new LoggerService();
}

class ErrorHandlerService {
  private readonly logger: LoggerService;
  private readonly maxErrors = 10;
  private recentErrors: Array<{ message: string; stack?: string; timestamp: Date }> = [];

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  handleError(error: Error | unknown): void {
    const errorObj = error instanceof Error
      ? { message: error.message, stack: error.stack, timestamp: new Date() }
      : { message: String(error), timestamp: new Date() };

    this.recentErrors.push(errorObj);
    if (this.recentErrors.length > this.maxErrors) {
      this.recentErrors.shift();
    }

    this.logger.error(errorObj.message, 'ErrorHandler');
    if (errorObj.stack && !this.logger.getLogs()) {
      console.error('Stack trace:', errorObj.stack);
    }
  }

  getRecentErrors(): ReadonlyArray<{ message: string; stack?: string; timestamp: Date }> {
    return Object.freeze([...this.recentErrors]);
  }

  clearErrors(): void {
    this.recentErrors.length = 0;
  }
}

function createErrorHandlerService(logger: LoggerService): ErrorHandlerService {
  return new ErrorHandlerService(logger);
}

class CacheService {
  private readonly cache = new Map<string, { data: unknown; expiry: number }>();
  private readonly defaultTTL = 5 * 60 * 1000;

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return false;
    }
    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}

function createCacheService(): CacheService {
  return new CacheService();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    {
      provide: ENVIRONMENT_TOKEN,
      useFactory: createConfigurationService
    },
    {
      provide: ConfigurationService,
      useFactory: createConfigurationService
    },
    {
      provide: LoggerService,
      useFactory: createLoggerService
    },
    {
      provide: ErrorHandlerService,
      useFactory: createErrorHandlerService,
      deps: [LoggerService]
    },
    {
      provide: CacheService,
      useFactory: createCacheService
    },
    importProvidersFrom(
      MatSnackBarModule,
      MatDialogModule,
      MatProgressSpinnerModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatTabsModule,
      MatExpansionModule,
      MatTreeModule,
      MatMenuModule,
      MatTooltipModule,
      MatChipsModule,
      MatBadgeModule,
      MatDividerModule,
      MatRippleModule
    )
  ]
};

export { ConfigurationService, LoggerService, ErrorHandlerService, CacheService, APP_CONFIG_TOKEN, ENVIRONMENT_TOKEN };
export type { AppEnvironment, FeatureFlags };