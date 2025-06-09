// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Importa tu AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {} // Inyecta el AuthService

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtener el token JWT del AuthService
    const token = this.authService.getToken(); 

    // Si existe un token, clonar la solicitud y añadir el encabezado de autorización
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Formato estándar: "Bearer [token]"
        }
      });
    }

    // Continuar con la solicitud modificada (o la original si no hay token)
    return next.handle(request);
  }
}