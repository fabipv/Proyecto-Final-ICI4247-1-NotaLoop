// src/app/notes/notes.page.ts

import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Navbar2Component } from 'src/app/components/navbar/navbar2/navbar2.component'; // Tu ruta correcta

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    Navbar2Component
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotesPage implements OnInit {

  notes = [
    {
      title: 'Modulo 1.2',
      description: 'Este apunte es sobre el modulo 1.2 sobre HTML_JS y CSS del ramo de Ingeniería Web y Movil',
      thumbnail: 'assets/icon/webMovil.jpg',
      imageUrl: 'assets/icon/webMovil.jpg', // Usar la misma para el detalle
      rating: 4
    },
    {
      title: 'Algebra Lineal',
      description: 'Este apunte abarca todo el contenido del ramo de Algebra Lineal',
      thumbnail: 'assets/icon/calculo.jpg',
      imageUrl: 'assets/icon/calculo.jpg', // <--- CAMBIO CRÍTICO AQUÍ: Ahora usa 'assets/icon/calculo.jpg'
      rating: 3
    },
    {
      title: 'Redes de Computadores',
      description: 'Este apunte contiene materia sobre interconexiones de redes',
      thumbnail: 'assets/icon/redes.jpg',
      imageUrl: 'assets/icon/redes.jpg',
      rating: 5
    },
    {
      title: 'Ingenieria Software',
      description: 'Este apunte contiene materia sobre la asignatura de Ingeniería de Software',
      thumbnail: 'assets/icon/ingSoft.jpg',
      imageUrl: 'assets/icon/ingSoft.jpg',
      rating: 2
    },
    {
      title: 'IA',
      description: 'Este apunte corresponde a la materia de inteligencia artificial',
      thumbnail: 'assets/icon/ia.jpg',
      imageUrl: 'assets/icon/ia.jpg',
      rating: 4
    },
    {
      title: 'Ciencias',
      description: 'Este apunte corresponde a la materia de ciencias',
      thumbnail: 'assets/icon/ciencia.jpg',
      imageUrl: 'assets/icon/ciencia.jpg',
      rating: 1
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  viewNoteDetails(note: any) {
    this.router.navigateByUrl('/note-detail', { state: { noteData: note } });
  }
}