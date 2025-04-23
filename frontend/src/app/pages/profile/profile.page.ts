import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; // Importa Router si vas a navegar

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule,RouterModule]
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  editarPerfil() {
    console.log('Editar perfil clickeado');
    // Si tienes una ruta llamada 'edit-profile', navega así:
    this.router.navigate(['/edit-profile']);
  }

}

