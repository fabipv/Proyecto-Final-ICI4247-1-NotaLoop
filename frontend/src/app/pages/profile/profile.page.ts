import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    NavbarComponent 
  ]
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  editarPerfil() {
    console.log('Editar perfil clickeado');
    this.router.navigate(['/edit-profile']);
  }

}
