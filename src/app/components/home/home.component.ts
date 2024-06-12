
import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Usa 'styleUrls' en lugar de 'styleUrl'
  imports: [
    NavbarComponent,
    RouterLink,
    RouterLinkActive
  ],
})
export class HomeComponent {

  constructor( private router: Router ){  }

  goCharacters(){
    this.router.navigate(['/characters']);
  }
  goLocations(){
    this.router.navigate(['/locations']);
  }
  goEpisodes(){
    this.router.navigate(['/episodes']);
  }


}