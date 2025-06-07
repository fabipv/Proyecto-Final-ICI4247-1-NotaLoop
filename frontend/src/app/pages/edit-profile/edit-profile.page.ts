import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { Navbar2Component } from 'src/app/components/navbar/navbar2/navbar2.component';

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    Navbar2Component
  ]
})
export class EditProfilePage {
  formEdit = {
    nombre: '',
    institucion: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) {} 

  guardarCambios() {
    console.log('Datos guardados:', this.formEdit);
    this.router.navigate(['/profile']);
  }
}