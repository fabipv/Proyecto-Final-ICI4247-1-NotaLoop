// src/app/pages/community/community.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// ¡CAMBIO AQUÍ! Importa los componentes de Ionic uno por uno
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonButton,
  IonText,
  AlertController // AlertController se importa aparte de los componentes UI
} from '@ionic/angular/standalone';

import { UsuarioService, Usuario } from '../../services/usuario.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: true, // Indica que es un componente standalone
  imports: [
    // ¡CAMBIO AQUÍ! Lista los componentes de Ionic usados en el HTML
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
    IonButton,
    IonText,
    // Otros módulos estándar de Angular
    CommonModule,
    FormsModule
  ]
})
export class CommunityPage implements OnInit {
  usuarios: Usuario[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.loading = true;
    this.error = null;
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
        console.log('Usuarios cargados en CommunityPage:', this.usuarios);
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los usuarios: ' + err.message;
        this.loading = false;
        console.error('Error al cargar usuarios en CommunityPage:', err);
        this.presentErrorAlert(this.error);
      }
    });
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje del Sistema',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async addNewUser() {
    const newUser = {
      rut: `98765432-${Math.floor(Math.random() * 9)}`,
      nombre: `TestUser ${Math.floor(Math.random() * 1000)}`,
      email: `testuser${Date.now()}@example.com`,
      contrasena: 'password123',
      rol: 'estudiante'
    };

    this.usuarioService.createUsuario(newUser).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente:', response);
        this.loadUsuarios();
        this.presentErrorAlert('Usuario creado exitosamente!');
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        this.presentErrorAlert('Error al crear usuario: ' + err.message);
      }
    });
  }
}