import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideNativeDateAdapter} from '@angular/material/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {jwtInterceptor} from './services/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ]
};
