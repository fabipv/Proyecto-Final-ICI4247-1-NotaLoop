// src/app/pages/comments/comments.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Si vas a añadir un campo de texto para nuevos comentarios
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'; // <-- Importa ActivatedRoute y Router
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons'; // Para el ion-back-button

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // Añade FormsModule si lo vas a usar
})
export class CommentsPage implements OnInit {

  noteTitle: string | null = null; // Para almacenar el título del apunte
  comments: any[] = []; // Array para almacenar comentarios (inicialmente vacío)
  newCommentText: string = ''; // Para el campo de texto de un nuevo comentario

  constructor(
    private activatedRoute: ActivatedRoute, // <-- Inyecta ActivatedRoute
    private router: Router // <-- Inyecta Router para el botón de volver
  ) {
    addIcons({ chevronBackOutline }); // Asegúrate de añadir el icono de la flecha de atrás
  }

  ngOnInit() {
    // Obtener el parámetro 'noteTitle' de la URL
    this.activatedRoute.paramMap.subscribe(params => {
      this.noteTitle = params.get('noteTitle');
      console.log('Comentarios para el apunte:', this.noteTitle);

      // Aquí podrías cargar los comentarios desde una API o un servicio
      // Por ahora, solo mostraremos algunos comentarios de ejemplo si el apunte coincide
      this.loadDummyComments();
    });
  }

  loadDummyComments() {
    // Esto es solo un ejemplo. En una aplicación real, cargarías esto de una base de datos.
    if (this.noteTitle === 'Algebra Lineal') {
      this.comments = [
        { user: '@EstudianteA', text: 'Excelente explicación de matrices!', date: '2023-01-15' },
        { user: '@ProfesorX', text: 'Muy claro el tema de vectores. ¡Buen trabajo!', date: '2023-01-20' }
      ];
    } else if (this.noteTitle === 'Modulo 1.2') {
      this.comments = [
        { user: '@WebDev', text: 'Útil para repasar HTML y CSS.', date: '2023-02-01' }
      ];
    } else {
      this.comments = [{ user: '@Anónimo', text: 'Sé el primero en comentar!', date: '' }];
    }
  }

  addComment() {
    if (this.newCommentText.trim() && this.noteTitle) {
      const newComment = {
        user: '@TuUsuario', // En una app real, sería el usuario logueado
        text: this.newCommentText.trim(),
        date: new Date().toISOString().slice(0, 10) // Fecha actual
      };
      this.comments.push(newComment);
      this.newCommentText = ''; // Limpiar el campo de texto

      // Aquí deberías enviar el comentario a tu backend/servicio
      console.log('Nuevo comentario añadido:', newComment);
    }
  }

  goBack() {
    this.router.navigateByUrl('/note-detail'); // Puedes volver a la página de detalle
  }
}