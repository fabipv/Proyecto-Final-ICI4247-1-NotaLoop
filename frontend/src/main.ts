// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// Importaciones para HttpClient e Interceptors
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http'; // <-- ¡Añade withInterceptorsFromDi y HTTP_INTERCEPTORS aquí!

// Importa tu interceptor
import { AuthInterceptor } from './app/interceptors/auth.interceptor'; // <-- ¡Añade esta importación para tu interceptor!

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { register } from 'swiper/element/bundle';
register();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Configura HttpClient para usar interceptores heredados (necesario para HTTP_INTERCEPTORS)
    provideHttpClient(withInterceptorsFromDi()), // <-- ¡Modifica esta línea para incluir withInterceptorsFromDi()!

    // Provee el interceptor HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Permite que existan múltiples interceptores
    }
  ],
});