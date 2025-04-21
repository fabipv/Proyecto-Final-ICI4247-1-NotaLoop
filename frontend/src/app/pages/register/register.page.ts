import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarComponent
  ]
})
export class RegisterPage {
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

  constructor(private alertController: AlertController, private router: Router) {}

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

  registrar() {
    if (this.formData.aceptaTerminos) {
      this.router.navigate(['/profile']);
    }
  }

  // Función para regresar a la página de inicio
  goBack() {
    this.router.navigate(['/']);
  }
}