// src/app/pages/forgot-password/forgot-password.page.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta a tu AuthService
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular'; // Para feedback al usuario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { IonicModule } from '@ionic/angular'; // Módulos de Ionic

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true, // Indica que es un componente standalone
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ForgotPasswordPage implements OnInit {
  email: string = ''; // Modelo para el input del correo

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    // Puedes inicializar algo aquí si es necesario
  }

  // Método que se llama al enviar el formulario
  async sendResetLink() {
    if (!this.email || this.email.trim() === '') {
      await this.presentToast('Por favor, ingresa tu correo electrónico.', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Enviando enlace de recuperación...',
      spinner: 'crescent',
    });
    await loading.present(); // Muestra el spinner de carga

    // Llama al método forgotPassword de tu AuthService
    this.authService.forgotPassword(this.email).subscribe({
      next: async (res) => {
        await loading.dismiss(); // Oculta el spinner
        // El backend devuelve un mensaje genérico por seguridad
        await this.presentToast(res.message || 'Si el correo está registrado, se ha enviado un enlace para restablecer tu contraseña.', 'success');
        // Opcional: redirige a una página de confirmación o al login
        this.router.navigate(['/login']); 
      },
      error: async (err) => {
        await loading.dismiss(); // Oculta el spinner
        console.error('Error al solicitar recuperación:', err);
        // Utiliza el mensaje de error formateado por tu handleError en AuthService
        await this.presentToast(err.message || 'Ocurrió un error al enviar la solicitud. Inténtalo de nuevo.', 'danger');
      }
    });
  }

  // Helper para mostrar mensajes Toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}