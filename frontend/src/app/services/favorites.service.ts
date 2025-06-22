// src/app/services/favorites.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define una interfaz para el tipo de favorito para mayor claridad y seguridad de tipo
export interface FavoriteNote {
  title: string;
  description: string;
  thumbnail: string; // Usaremos thumbnail para la imagen en favoritos
  // Puedes añadir más propiedades si las necesitas, como 'id' o 'rating'
}

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea un singleton y esté disponible en toda la aplicación
})
export class FavoritesService {
  // BehaviorSubject es ideal para almacenar el estado actual y emitir cambios.
  // Emite el valor inicial (un array vacío) a los suscriptores al instante.
  private _favorites = new BehaviorSubject<FavoriteNote[]>([]);

  // Observable público para que los componentes puedan suscribirse a los cambios
  // El asObservable() previene que los componentes externos modifiquen el BehaviorSubject directamente
  public favorites$: Observable<FavoriteNote[]> = this._favorites.asObservable();

  constructor() {
    // Opcional: Cargar favoritos desde localStorage al iniciar el servicio
    this.loadFavorites();
  }

  // Carga favoritos desde localStorage
  private loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsedFavorites: FavoriteNote[] = JSON.parse(storedFavorites);
        this._favorites.next(parsedFavorites); // Actualiza el BehaviorSubject
      } catch (e) {
        console.error('Error parsing favorites from localStorage', e);
        localStorage.removeItem('favorites'); // Limpiar datos corruptos
      }
    }
  }

  // Guarda favoritos en localStorage
  private saveFavorites(favorites: FavoriteNote[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Método para añadir un apunte a favoritos
  addFavorite(note: FavoriteNote) {
    const currentFavorites = this._favorites.getValue();
    // Evitar duplicados: Si la nota ya está en favoritos, no la agregamos de nuevo
    if (!currentFavorites.some(fav => fav.title === note.title)) { // Asumimos que el título es único para este ejemplo
      const updatedFavorites = [...currentFavorites, note];
      this._favorites.next(updatedFavorites); // Emite el nuevo array a todos los suscriptores
      this.saveFavorites(updatedFavorites); // Guarda en localStorage
      console.log('Apunte añadido a favoritos:', note.title);
    } else {
      console.log('El apunte ya está en favoritos:', note.title);
    }
  }

  // Método para eliminar un apunte de favoritos
  removeFavorite(noteTitle: string) { // Usamos el título para identificar y eliminar
    const currentFavorites = this._favorites.getValue();
    const updatedFavorites = currentFavorites.filter(fav => fav.title !== noteTitle);
    this._favorites.next(updatedFavorites);
    this.saveFavorites(updatedFavorites);
    console.log('Apunte eliminado de favoritos:', noteTitle);
  }

  // Método para verificar si un apunte ya está en favoritos (útil para la UI)
  isFavorite(noteTitle: string): boolean {
    return this._favorites.getValue().some(fav => fav.title === noteTitle);
  }

  // Opcional: Obtener el array actual (si no quieres suscribirte)
  getCurrentFavorites(): FavoriteNote[] {
    return this._favorites.getValue();
  }
}