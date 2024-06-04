import { Component, Input} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { Character } from '../interfaces/character.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,

    

  ],
  templateUrl: './tarjetas.component.html',
  
})
export class TarjetasComponent {

  @Input() items : any[]=[];
  isFavorite : boolean = false;
  constructor(

   
    private router: Router,
    private firestore: Firestore,
    private rickyMortyService : RickMortyService,

  ){}

  addFavorite(event: Event, character: Character) {
    event.stopPropagation(); // Evita que el clic en el botón dispare también el clic en la tarjeta
    this.rickyMortyService.addFavorito(character).subscribe({
      next: () => {
        character.isFavorite = true; // Actualiza el estado localmente
      },
      error: (error : any) => {
        console.error('Error al añadir a favoritos:', error);
      }
    });
  }

  

   verPersonaje( character : Character){
    let personajeId=character.id;
    this.router.navigate(['/characterDetails/', personajeId]);
   }

  
   
}

