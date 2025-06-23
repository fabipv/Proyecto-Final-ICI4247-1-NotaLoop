// frontend/src/app/pages/register/register.page.ts

import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service'; // <-- Asegúrate de que esta ruta sea correcta para tu AuthService

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Importa FormsModule si usas [(ngModel)]
    IonicModule,
    NavbarComponent
  ]
})
export class RegisterPage {
  // Ajusta la estructura de formData para que coincida con los campos de la base de datos y HTML
  formData = {
    nombre: '',           // <-- AÑADIDO: Campo 'nombre' para el nombre principal del usuario
    apellidos: '',        // Correcto, ahora se enviará
    nombre_usuario: '',   // Correcto, este es el que espera el backend
    // usuario: '',         // <-- ELIMINADO: Este campo es redundante y causaba confusión con 'nombre_usuario'
    rut: '',
    comuna: '',           // Correcto, ahora se enviará
    region: '',           // Correcto, ahora se enviará
    email: '',
    password: '',
    confirmarPassword: '', // Para validación frontend, no se envía al backend
    aceptaTerminos: false
  };

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async verTerminos() {
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones',
      message: `
        1. Debes usar la plataforma de forma responsable.
        2. No compartir contenido con derechos de autor sin permiso.
        3. Respetar a los demás usuarios.
        4. Tus datos serán tratados con la máxima confidencialidad.
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  async registrar() {
    // 1. Validaciones básicas en el frontend
    if (!this.formData.aceptaTerminos) {
      await this.presentAlert('Términos no aceptados', 'Debes aceptar los términos y condiciones para registrarte.');
      return;
    }

    if (this.formData.password !== this.formData.confirmarPassword) {
      await this.presentAlert('Error de Contraseña', 'Las contraseñas no coinciden. Por favor, verifica.');
      return;
    }

    // 2. Asegurarse de que los campos mínimos requeridos por el backend estén presentes
    // La validación ahora incluye 'nombre', 'apellidos' y 'nombre_usuario'
    if (!this.formData.nombre || !this.formData.apellidos || !this.formData.nombre_usuario || !this.formData.rut || !this.formData.email || !this.formData.password) {
        await this.presentAlert('Campos incompletos', 'Por favor, rellena todos los campos obligatorios (Nombre, Apellidos, Nombre de Usuario, Rut, Correo, Contraseña).');
        return;
    }


    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // 3. Preparar los datos para enviar al backend
      // Solo enviamos los campos que el backend espera y con los nombres correctos
      const userData = {
        nombre: this.formData.nombre,           // <-- Se envía 'nombre'
        apellidos: this.formData.apellidos,     // <-- Se envía 'apellidos'
        rut: this.formData.rut,
        email: this.formData.email,
        password: this.formData.password,
        nombre_usuario: this.formData.nombre_usuario, // <-- Se envía 'nombre_usuario'
        comuna: this.formData.comuna,           // <-- Se envía 'comuna'
        region: this.formData.region,           // <-- Se envía 'region'
        rol: 'estudiante' // Puedes mantenerlo fijo o hacerlo seleccionable en el futuro
      };

      // 4. Llamar al servicio de autenticación
      const response = await this.authService.register(userData).toPromise(); // .toPromise() convierte el Observable en una Promesa

      loading.dismiss(); // Oculta el loading
      await this.presentToast('Registro exitoso', 'success'); // Muestra un mensaje de éxito
      this.router.navigate(['/login']); // Redirige al usuario a la página de login

    } catch (error: any) {
      loading.dismiss(); // Oculta el loading
      console.error('Error durante el registro:', error);

      let errorMessage = 'Hubo un error al intentar registrarte. Por favor, intenta de nuevo.';

      if (error.error && error.error.message) {
        // Si el backend envía un mensaje de error específico
        errorMessage = error.error.message;
      } else if (error.status === 0) {
        // Error de conexión, backend no accesible
        errorMessage = 'No se pudo conectar con el servidor. ¿Está el backend en funcionamiento?';
      }

      await this.presentAlert('Error de Registro', errorMessage);
    }
  }

  // Función auxiliar para mostrar alerts
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función auxiliar para mostrar toasts (mensajes temporales)
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  // Función para regresar a la página de inicio
  goBack() {
    this.router.navigate(['/']);
  }
}