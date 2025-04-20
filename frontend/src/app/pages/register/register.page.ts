import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    FormsModule
  ]
})
export class RegisterPage {
  // 1) Define aquí formData con todas las propiedades que usas en tu HTML
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

  // 2) Método que llamas desde el HTML: (click)="registrar()"
  registrar() {
    // Por ahora, sólo para debug, muestra los datos:
    console.log('Registrando usuario:', this.formData);
    // Aquí iría tu llamada a la API o lógica de registro
  }
}