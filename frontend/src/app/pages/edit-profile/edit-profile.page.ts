import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule]
})
export class EditProfilePage {
  formEdit = {
    nombre: '',
    institucion: '',
    email: '',
    password: ''
  };

  constructor() {}

  guardarCambios() {
    console.log('Datos guardados:', this.formEdit);
    // Aquí puedes agregar tu lógica para enviar los datos al backend
  }
}
