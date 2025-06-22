// src/app/favoritos/favoritos.page.ts

import { Component, OnInit, OnDestroy } from '@angular/core'; // <-- Añade OnInit y OnDestroy
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar2Component } from 'src/app/components/navbar/navbar2/navbar2.component';
import { FavoritesService, FavoriteNote } from 'src/app/services/favorites.service'; // <-- Importa el servicio y la interfaz
import { Subscription } from 'rxjs'; // <-- Para gestionar la suscripción

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    Navbar2Component 
  ],
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit, OnDestroy { // <-- Implementa OnInit y OnDestroy

  favoritos: FavoriteNote[] = []; // <-- Ahora será llenado por el servicio
  private favoritesSubscription: Subscription | undefined; // <-- Para almacenar la suscripción

  constructor(private favoritesService: FavoritesService) { // <-- Inyecta el servicio
    // El constructor es un buen lugar para iniciar la suscripción
  }

  ngOnInit() {
    // Suscribirse a los cambios en la lista de favoritos del servicio
    this.favoritesSubscription = this.favoritesService.favorites$.subscribe(favs => {
      this.favoritos = favs; // Actualiza el array local cuando cambian los favoritos
      console.log('Favoritos cargados en FavoritosPage:', this.favoritos); // Para depurar
    });
  }

  ngOnDestroy() {
    // Es crucial desuscribirse para evitar fugas de memoria
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  eliminarFavorito(favorito: FavoriteNote) {
    this.favoritesService.removeFavorite(favorito.title); // <-- Usa el servicio para eliminar
  }
}