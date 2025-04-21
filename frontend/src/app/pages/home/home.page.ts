import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
//import { SwiperModule } from 'swiper/angular';
//import SwiperCore, { Pagination } from 'swiper';

// Configura Swiper
//SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    //SwiperModule,
    NavbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomePage {
  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: { clickable: true }
  };

  constructor(private router: Router) {}
}