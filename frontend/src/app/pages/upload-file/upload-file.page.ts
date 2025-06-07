import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importa solo IonicModule
import { RouterModule, Router } from '@angular/router';
import { Navbar2Component } from 'src/app/components/navbar/navbar2/navbar2.component';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.page.html',
  styleUrls: ['./upload-file.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Todos los componentes Ionic se importan a través de este módulo
    RouterModule,
    Navbar2Component
  ]
})
export class UploadFilePage implements OnInit {
  termsAccepted: boolean = false;
  courses = [
    { name: 'Curso 1', hasPrice: false },
    { name: 'Curso 2', hasPrice: true },
    { name: 'Curso 3', hasPrice: false },
    { name: 'Curso 4', hasPrice: true }
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

  addFile() {
    console.log('Añadir archivo clickeado');
    // Lógica para añadir archivo
  }

  addImage() {
    console.log('Añadir imagen clickeado');
    // Lógica para añadir imagen
  }

  addLink() {
    console.log('Añadir link clickeado');
    // Lógica para añadir link
  }
}