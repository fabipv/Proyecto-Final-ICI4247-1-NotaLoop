import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule]
})
export class EditProfilePage {
  user = {
    name: '',
    email: '',
    description: ''
  };

  saveChanges() {
    console.log('Cambios guardados:', this.user);
    // Aquí puedes hacer lógica para guardar los cambios, etc.
  }
}
