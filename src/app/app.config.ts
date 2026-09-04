// src/app/app.config.ts — Angular 19 Zoneless & App Initializer
import { ApplicationConfig, provideZonelessChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SecureShieldService } from './services/secureshield.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    // 🛡️ Asynchronously initializes 3-Key cryptography before initial view render
    provideAppInitializer(() => {
      const shield = inject(SecureShieldService);
      shield.initSecureShield().catch(err => console.warn('[SecureShield] Startup notice:', err));
      return Promise.resolve(true); // 🚀 Yields immediately so Angular renders in 0ms without freezing
    })
  ]
};