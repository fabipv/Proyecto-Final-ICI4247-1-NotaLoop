// src/app/note-detail/note-detail.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoritesService, FavoriteNote } from 'src/app/services/favorites.service'; // <-- Importa el servicio y la interfaz

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NoteDetailPage implements OnInit {

  note: any;
  currentRating: number = 0;
  hoverRating: number = 0;
  isNoteFavorite: boolean = false; // <-- Nueva propiedad para saber si es favorito

  constructor(
    private router: Router,
    private favoritesService: FavoritesService // <-- Inyecta el servicio
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.note = navigation.extras.state['noteData'];
      if (this.note) {
        if (typeof this.note.rating === 'number') {
          this.currentRating = this.note.rating;
          this.hoverRating = this.note.rating;
        }
        // Verificar si la nota actual ya es favorita
        this.isNoteFavorite = this.favoritesService.isFavorite(this.note.title); // <-- Usa el servicio
      }
    }
  }

  ngOnInit() {
    if (!this.note) {
      console.error('NoteDetailPage: ¡ERROR! El objeto "note" es null/undefined en ngOnInit.');
    }
  }

  setRating(stars: number) {
    this.currentRating = stars;
    this.hoverRating = stars;
    console.log('NoteDetailPage: Calificación seleccionada:', this.currentRating);
  }

  onStarHover(stars: number) {
    this.hoverRating = stars;
  }

  onStarLeave() {
    this.hoverRating = this.currentRating;
  }

  getStarIcon(index: number): string {
    const displayRating = this.hoverRating !== 0 ? this.hoverRating : this.currentRating;
    return displayRating >= index ? 'star' : 'star-outline';
  }

  // <-- Nuevo método para togglear favoritos -->
  toggleFavorite() {
    if (this.note) {
      if (this.isNoteFavorite) {
        this.favoritesService.removeFavorite(this.note.title);
      } else {
        // Asegúrate de que las propiedades coincidan con FavoriteNote
        const favNote: FavoriteNote = {
          title: this.note.title,
          description: this.note.description,
          thumbnail: this.note.thumbnail // Usamos thumbnail para la lista de favoritos
        };
        this.favoritesService.addFavorite(favNote);
      }
      this.isNoteFavorite = !this.isNoteFavorite; // Actualiza el estado local
    }
  }

  goBack() {
    this.router.navigateByUrl('/notes');
  }
}