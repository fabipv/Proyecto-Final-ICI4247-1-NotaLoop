import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component'; // Importa el NavbarComponent
import { IonicModule } from '@ionic/angular'; // Importa IonicModule

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    NavbarComponent, 
  ]
})
export class HomePage {
  constructor(private router: Router) {}
}