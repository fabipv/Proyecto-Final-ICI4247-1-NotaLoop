import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Navbar2Component } from 'src/app/components/navbar/navbar2/navbar2.component'

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
    Navbar2Component 
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
