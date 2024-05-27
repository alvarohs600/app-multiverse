import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { AsyncPipe, CommonModule } from '@angular/common';
import { RickMortyService } from './components/shared/services/rick-morty.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    AsyncPipe,
  
  ],
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'multiversoR';
  isnotLogin : boolean= true;

  constructor(private router : Router){

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

  checkRoute(url: string): void {
    this.isnotLogin = !(url === '/login' || url === '/registro');
  }
 

}
