import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,       // Para *ngIf, ngFor, etc.
    FormsModule,        // Para [(ngModel)]
    IonicModule,        // Para componentes ion-*
    NavbarComponent     // Nuestro navbar reutilizable
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  // Datos del formulario
  formData = {
    nombre: '',
    apellidos: '',
    usuario: '',
    rut: '',
    comuna: '',
    region: '',
    email: '',
    password: '',
    confirmarPassword: '',
    aceptaTerminos: false
  };

  constructor(private alertController: AlertController) {}

  /** Muestra una alerta con los términos y condiciones */
  async verTerminos() {
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones',
      message: `
        1. Debes usar la plataforma de forma responsable.
        2. No compartir contenido con derechos de autor sin permiso.
        3. Respetar a los demás usuarios.
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  /** Lógica que se ejecuta al pulsar "Registrar" */
  registrar() {
    console.log('Registrando usuario:', this.formData);
    // TODO: Llamar a tu servicio de registro aquí
  }
}