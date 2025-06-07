import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule  
  ]
})
export class Navbar2Component {}