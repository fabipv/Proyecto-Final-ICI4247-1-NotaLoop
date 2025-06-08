// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Aquí sí se importa HttpClient
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define una interfaz para tus usuarios para mejor tipado (opcional pero recomendado)
// Ajusta estos campos para que coincidan EXACTAMENTE con las propiedades
// que devuelve tu API de usuarios y las que esperas enviar/recibir.
export interface Usuario {
  id?: number; // El ID podría ser opcional si se genera en el backend
  rut: string;
  nombre: string;
  email: string;
  contrasena?: string; // Podría ser opcional al actualizar o recibir
  rol: string;
  puntos?: number; // Puede tener un valor por defecto
  estado?: string; // Puede tener un valor por defecto
  titulo_academico?: string | null;
  biografia?: string | null;
  fecha_registro?: string; // Se genera en el backend
}

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // URL de tu API de usuarios

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear un nuevo usuario
  // Usa Partial<Usuario> si los campos opcionales pueden omitirse al crear,
  // o Omit<Usuario, 'id' | 'fecha_registro'> si esos se generan en el backend.
  // Ajusta los campos aquí para que coincidan con lo que tu endpoint POST espera.
  createUsuario(usuario: Omit<Usuario, 'id' | 'fecha_registro' | 'puntos' | 'estado' | 'titulo_academico' | 'biografia'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un usuario existente
  updateUsuario(id: number, usuario: Partial<Usuario>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un usuario
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Función genérica para manejar errores de la API
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend devolvió un código de error (por ejemplo, 400, 500)
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message || error.error?.error || JSON.stringify(error.error)}`;
    }
    console.error('Error en UsuarioService:', error);
    return throwError(() => new Error(errorMessage));
  }
}