// src/app/note-detail/note-detail.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    console.log('NoteDetailPage: Constructor iniciado.');
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation && navigation.extras && navigation.extras.state) {
      this.note = navigation.extras.state['noteData'];
      console.log('NoteDetailPage: Datos de la nota recibidos del Router State:', this.note);
      
      if (this.note) {
        if (typeof this.note.rating === 'number') {
          this.currentRating = this.note.rating;
          this.hoverRating = this.note.rating;
        }
        console.log('NoteDetailPage: note.title:', this.note.title);
        console.log('NoteDetailPage: note.thumbnail:', this.note.thumbnail);
        console.log('NoteDetailPage: note.imageUrl:', this.note.imageUrl);
      } else {
        console.warn('NoteDetailPage: "noteData" estaba presente en el estado, pero el objeto note es null/undefined.');
      }
    } else {
      console.warn('NoteDetailPage: No se encontraron datos de navegación o estado en el Router.');
    }
  }

  ngOnInit() {
    if (!this.note) {
      console.error('NoteDetailPage: ¡ERROR! El objeto "note" es null/undefined en ngOnInit. No se puede mostrar el detalle.');
      // Opcional: Si 'note' no existe, redirigir al usuario de vuelta.
      // this.router.navigateByUrl('/notes');
    } else {
        console.log('NoteDetailPage: ngOnInit - Objeto note final:', this.note);
        console.log('NoteDetailPage: ngOnInit - URL de la imagen a mostrar:', this.note.imageUrl || this.note.thumbnail);
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

  goBack() {
    this.router.navigateByUrl('/notes');
  }
}