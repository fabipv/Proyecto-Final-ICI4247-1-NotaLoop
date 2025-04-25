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
    {
      titulo: 'IA',
      descripcion: 'informacion sobre la inteli...',
      imagen: 'assets/icon/ia.jpg'
    },
    {
      titulo: 'Ing. de Software',
      descripcion: 'Descripción sobre la Ingeniería de Software',
      imagen: 'assets/icon/ingSoft.jpg'
    },
    {
      titulo: 'Cálculo',
      descripcion: 'Descripción sobre temas de cálculo',
      imagen: 'assets/icon/calculo.jpg'
    }
  ];

  eliminarFavorito(favorito: any) {
    const index = this.favoritos.indexOf(favorito);
    if (index !== -1) {
      this.favoritos.splice(index, 1); // Elimina el favorito de la lista
    }
  }
}