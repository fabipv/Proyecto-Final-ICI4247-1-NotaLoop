import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';  // Asegúrate de importar Router y RouterModule
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonicModule,       // Importa todos los componentes Ionic
    FormsModule,       // Para usar ngModel
    RouterModule,      // Para usar routerLink
    NavbarComponent    // Para el componente navbar personalizado
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  formData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}  // Inyectamos el Router en el constructor

  iniciarSesion() {
    console.log('Iniciar sesión con:', this.formData);

    // Redirige a la página de perfil si las credenciales son correctas
    // Esto es solo un ejemplo, puedes agregar tu lógica de autenticación aquí
    this.router.navigate(['/profile']);  // Redirige al perfil
  }
}