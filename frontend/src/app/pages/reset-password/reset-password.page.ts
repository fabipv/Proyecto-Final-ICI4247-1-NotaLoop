// src/app/pages/reset-password/reset-password.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Para leer el token de la URL
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta
import { ToastController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ResetPasswordPage implements OnInit {
  token: string = ''; // Para almacenar el token de la URL
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private activatedRoute: ActivatedRoute, // Para acceder a los parámetros de la URL
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    // Lee el token de los parámetros de la URL cuando la página se inicializa
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'] || ''; // Obtiene el valor del parámetro 'token'
      if (!this.token) {
        this.presentToast('Token de recuperación no encontrado. Por favor, solicita uno nuevo.', 'danger');
        // Opcional: redirigir si no hay token
        this.router.navigate(['/forgot-password']);
      }
    });
  }

  async resetMyPassword() {
    if (!this.token) {
      await this.presentToast('No hay token de recuperación. Regresa a la página anterior.', 'danger');
      return;
    }
    if (!this.newPassword || !this.confirmPassword) {
      await this.presentToast('Por favor, ingresa y confirma tu nueva contraseña.', 'danger');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      await this.presentToast('Las contraseñas no coinciden.', 'danger');
      return;
    }
    if (this.newPassword.length < 6) { // Ejemplo de validación mínima
      await this.presentToast('La contraseña debe tener al menos 6 caracteres.', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Restableciendo contraseña...',
      spinner: 'crescent',
    });
    await loading.present();

    // Llama al método resetPassword de tu AuthService
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: async (res) => {
        await loading.dismiss();
        await this.presentToast(res.message || 'Contraseña restablecida exitosamente.', 'success');
        this.router.navigate(['/login']); // Redirige al login después de un restablecimiento exitoso
      },
      error: async (err) => {
        await loading.dismiss();
        console.error('Error al restablecer contraseña:', err);
        await this.presentToast(err.message || 'Ocurrió un error al restablecer la contraseña. Inténtalo de nuevo.', 'danger');
      }
    });
  }

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