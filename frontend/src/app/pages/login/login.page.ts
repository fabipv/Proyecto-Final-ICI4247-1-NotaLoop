// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonicModule, 
  AlertController, 
  LoadingController, // <-- ¡Importa LoadingController!
  ToastController // Opcional, si quieres usar toasts para éxito/error
} from '@ionic/angular'; 
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  formData = {
    email: '',
    password: ''
  };
  // Ya no necesitas 'loading = false;' aquí si usas LoadingController

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController, // <-- ¡Inyecta LoadingController!
    private toastController: ToastController // <-- Inyecta ToastController (opcional)
  ) {}

  async iniciarSesion() {
    console.log('Intentando iniciar sesión con:', this.formData);

    // Validaciones básicas del formulario
    if (!this.formData.email || !this.formData.password) {
      await this.presentAlert('Campos incompletos', 'Por favor, introduce tu correo electrónico y contraseña.');
      return; // Detiene la ejecución si los campos están vacíos
    }

    // Muestra un indicador de carga
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // Llama al método login del AuthService y lo convierte a Promesa con .toPromise()
      const response = await this.authService.login(this.formData).toPromise();

      loading.dismiss(); // Oculta el indicador de carga
      console.log('Login exitoso:', response);

      // Muestra un Toast de éxito (opcional, puedes usar Alert si prefieres)
      await this.presentToast('Inicio de sesión exitoso.', 'success');

      // Redirige al perfil o a la página principal después del login exitoso
      this.router.navigate(['/profile']); 

    } catch (error: any) { // Captura los errores de la Promesa (del backend o de conexión)
      loading.dismiss(); // Oculta el indicador de carga
      console.error('Error durante el inicio de sesión:', error);

      // Usamos el mensaje de error amigable que ya preparaste en tu AuthService
      let errorMessage = 'Hubo un error al iniciar sesión. Por favor, intenta de nuevo.';
      if (error.message) { // 'error.message' viene del throwError(() => new Error(errorMessage)); en AuthService
        errorMessage = error.message;
      } else if (error.status === 0) { // Error de red o CORS
        errorMessage = 'No se pudo conectar con el servidor. ¿Está el backend en funcionamiento?';
      }
      
      await this.presentAlert('Error de Inicio de Sesión', errorMessage);
    }
  }

  // Helper para mostrar alerts
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Helper para mostrar toasts (mensajes temporales en la parte inferior)
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}