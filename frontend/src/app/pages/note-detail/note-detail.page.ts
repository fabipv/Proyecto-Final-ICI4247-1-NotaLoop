// src/app/note-detail/note-detail.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoritesService, FavoriteNote } from 'src/app//services/favorites.service';
import { addIcons } from 'ionicons'; // Asegúrate de que esto ya esté aquí si lo moviste de main.ts para depurar
import { chatbubblesOutline } from 'ionicons/icons'; // <-- Importa el icono de chatbubbles

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
  isNoteFavorite: boolean = false;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {
    addIcons({ chatbubblesOutline }); // <-- Añade este icono si no está en main.ts
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.note = navigation.extras.state['noteData'];
      if (this.note) {
        if (typeof this.note.rating === 'number') {
          this.currentRating = this.note.rating;
          this.hoverRating = this.note.rating;
        }
        this.isNoteFavorite = this.favoritesService.isFavorite(this.note.title);
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

  toggleFavorite() {
    if (this.note) {
      if (this.isNoteFavorite) {
        this.favoritesService.removeFavorite(this.note.title);
      } else {
        const favNote: FavoriteNote = {
          title: this.note.title,
          description: this.note.description,
          thumbnail: this.note.thumbnail
        };
        this.favoritesService.addFavorite(favNote);
      }
      this.isNoteFavorite = !this.isNoteFavorite;
    }
  }

  // <-- NUEVO MÉTODO PARA VER COMENTARIOS -->
  viewComments() {
    if (this.note && this.note.title) {
      this.router.navigate(['/comments', this.note.title]); // Navega a /comments/TITULO_DEL_APUNTE
      console.log('Navegando a comentarios para:', this.note.title);
    } else {
      console.warn('No se puede navegar a comentarios: título del apunte no disponible.');
    }
  }

  goBack() {
    this.router.navigateByUrl('/notes');
  }
}