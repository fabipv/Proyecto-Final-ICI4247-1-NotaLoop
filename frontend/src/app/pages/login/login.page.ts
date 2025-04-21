import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
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

  iniciarSesion() {
    console.log('Iniciar sesión con:', this.formData);
  }
}