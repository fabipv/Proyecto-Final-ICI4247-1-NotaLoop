import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  favoritos = [
    { titulo: 'Apunte 1', descripcion: 'Descripción del apunte 1', imagen: 'ruta/a/la/imagen1.jpg' },
    { titulo: 'Apunte 2', descripcion: 'Descripción del apunte 2', imagen: 'ruta/a/la/imagen2.jpg' },
    { titulo: 'Apunte 3', descripcion: 'Descripción del apunte 3', imagen: 'ruta/a/la/imagen3.jpg' }
  ];

  eliminarFavorito(favorito: any) {
    this.favoritos = this.favoritos.filter(f => f !== favorito);
  }
}