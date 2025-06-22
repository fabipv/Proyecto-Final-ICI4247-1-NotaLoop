// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// Importaciones para HttpClient e Interceptors
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

// Importa tu interceptor
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// *******************************************************************
// INICIO DE LA SECCIÓN DE IONICONS - ¡NUEVAS LÍNEAS!
// *******************************************************************
import { addIcons } from 'ionicons';
import { 
  heartOutline, 
  downloadOutline, 
  star, 
  starOutline, 
  chevronBackOutline // Este es el icono por defecto para ion-back-button
} from 'ionicons/icons';
// *******************************************************************
// FIN DE LA SECCIÓN DE IONICONS
// *******************************************************************

import { register } from 'swiper/element/bundle';
register();

// *******************************************************************
// LLAMA A addIcons CON LOS ICONOS IMPORTADOS ANTES DE bootstrapApplication - ¡NUEVA SECCIÓN!
// *******************************************************************
addIcons({ 
  heartOutline, 
  downloadOutline, 
  star, 
  starOutline,
  chevronBackOutline 
});
// *******************************************************************

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Configura HttpClient para usar interceptores heredados (necesario para HTTP_INTERCEPTORS)
    provideHttpClient(withInterceptorsFromDi()),

    // Provee el interceptor HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Permite que existan múltiples interceptores
    }
  ],
});