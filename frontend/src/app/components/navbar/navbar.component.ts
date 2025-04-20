import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonicModule] // Usa IonicModule en vez de importar los componentes individualmente
})
export class NavbarComponent {}
