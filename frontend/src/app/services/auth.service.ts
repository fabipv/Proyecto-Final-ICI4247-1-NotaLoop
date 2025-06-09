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
// Ajusta esto para que coincida con lo que tu backend de registro espera
export interface RegisterData {
  nombre: string;
  rut: string;
  email: string;
  password: string;
  // Puedes añadir otros campos como 'apellidos', 'comuna', 'region', 'rol' aquí si tu backend los requiere
  // Ejemplo: rol: string;
}

// Interfaz para la respuesta del login (lo que devuelve tu backend)
export interface AuthResponse {
  token: string;
  expiresIn: number; // Opcional: si el token tiene una fecha de expiración
  user?: any; // Opcional: información del usuario (ej. id, email, rol)
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL base de tus endpoints de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken()); // Para mantener el estado de autenticación

  constructor(private http: HttpClient, private router: Router) { }

  // Observable que las otras partes de la app pueden suscribirse para saber si el usuario está autenticado
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
    // Aquí puedes incluir los campos de comuna, region, etc., si tu backend los espera
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          console.log('Registro exitoso:', response);
          // Puedes optar por loguear al usuario automáticamente después del registro,
          // o simplemente redirigirlo a la página de login. Por ahora, no guardamos token aquí.
        }),
        catchError(this.handleError)
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
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else if (error.status) {
      // Errores del servidor (ej. 401 Unauthorized, 404 Not Found, 500 Internal Server Error)
      errorMessage = `Error del servidor: ${error.status} - ${error.error?.message || error.statusText}`;
      if (error.status === 401) {
        errorMessage = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
      } else if (error.status === 409) { // Por ejemplo, si el email ya existe al registrar
        errorMessage = 'El correo electrónico ya está registrado.';
      }
    }
    console.error('Error en AuthService:', error);
    return throwError(() => new Error(errorMessage));
  }
}