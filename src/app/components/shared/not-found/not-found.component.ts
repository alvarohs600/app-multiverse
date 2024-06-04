
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RickMortyService } from '../services/rick-morty.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  constructor(private router: Router){

  }

    goHome():void {
    
      this.router.navigate(['/home']);
    }
  

}
