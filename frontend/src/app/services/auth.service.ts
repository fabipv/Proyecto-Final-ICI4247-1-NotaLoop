// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // Para redirigir al logout

// Interfaz para los datos que se envían al login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interfaz para los datos que se envían al registro
export interface RegisterData {
  nombre: string;
  apellidos?: string; // Hago opcional si no es siempre requerido en el backend
  rut: string;
  comuna?: string;
  region?: string;
  email: string;
  password: string;
  nombre_usuario?: string; // Asegúrate de que este campo esté aquí
  rol?: string; // Si manejas roles desde el frontend
}

// Interfaz para la respuesta del login (lo que devuelve tu backend)
export interface AuthResponse {
  token: string;
  expiresIn?: number; // Opcional: si el token tiene una fecha de expiración
  user?: any; // Opcional: información del usuario (ej. id, email, rol)
  message?: string; // Para mensajes de éxito o error
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Asegúrate de que esta URL sea la correcta para tu backend
  private apiUrl = 'http://localhost:3000/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  // Observable que otras partes de la app pueden suscribirse para saber si el usuario está autenticado
  isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  // Método para verificar si ya existe un token en localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('jwt_token'); // Devuelve true si hay un token, false si no
  }

  // --- Métodos de Autenticación ---

  // Método para el inicio de sesión
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Si el login es exitoso, guarda el token
          localStorage.setItem('jwt_token', response.token);
          this.isAuthenticatedSubject.next(true); // Actualiza el estado de autenticación
          console.log('Login exitoso. Token guardado:', response.token);
        }),
        catchError(this.handleError)
      );
  }

  // Método para el registro de usuario
  register(userData: RegisterData): Observable<any> {
    // Aquí se envían todos los campos que el backend espera, según la interfaz RegisterData
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          console.log('Registro exitoso:', response);
          // Opcionalmente, podrías iniciar sesión automáticamente aquí si el backend devuelve un token
          // localStorage.setItem('jwt_token', response.token);
          // this.isAuthenticatedSubject.next(true);
        }),
        catchError(this.handleError)
      );
  }

  // Método para solicitar la recuperación de contraseña (envío de correo)
  forgotPassword(email: string): Observable<any> {
    // Hace una petición POST a /api/auth/forgot-password con el email
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email })
      .pipe(
        tap(response => {
          console.log('Solicitud de recuperación de contraseña enviada:', response);
        }),
        catchError(this.handleError) // Reutiliza tu manejador de errores existente
      );
  }

  // Método para restablecer la contraseña usando el token recibido por correo
  resetPassword(token: string, newPassword: string): Observable<any> {
    // Hace una petición POST a /api/auth/reset-password con el token y la nueva contraseña
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { token, newPassword })
      .pipe(
        tap(response => {
          console.log('Contraseña restablecida exitosamente:', response);
        }),
        catchError(this.handleError) // Reutiliza tu manejador de errores existente
      );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('jwt_token'); // Elimina el token del almacenamiento local
    this.isAuthenticatedSubject.next(false); // Actualiza el estado de autenticación
    this.router.navigate(['/login']); // Redirige al login o a la página de inicio
    console.log('Sesión cerrada. Token eliminado.');
  }

  // --- Métodos Auxiliares para el Token ---

  // Obtener el token JWT actual
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Verificar si el token es válido (simple verificación de existencia, no de expiración)
  // Para una verificación más robusta, necesitarías decodificar el token y comprobar su 'exp'
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  // Manejo de errores de HTTP
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else if (error.status) {
      // Errores del servidor (ej. 401 Unauthorized, 404 Not Found, 500 Internal Server Error)
      errorMessage = `Error del servidor: ${error.status} - ${error.error?.message || error.statusText}`;
      if (error.status === 401) {
        errorMessage = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
      } else if (error.status === 409) { // Por ejemplo, si el email ya existe al registrar
        errorMessage = 'El correo electrónico o nombre de usuario ya está registrado.';
      } else if (error.status === 400 && error.error?.message) {
        // Captura mensajes de error específicos de validación del backend para 400 Bad Request
        errorMessage = error.error.message;
      }
    }
    console.error('Error en AuthService:', error);
    // Vuelve a lanzar el error para que el componente que llama pueda manejarlo
    return throwError(() => new Error(errorMessage));
  }
}