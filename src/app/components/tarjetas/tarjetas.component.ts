import { Component, Inject, Input} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { Character } from '../interfaces/character.interface';


@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [
    

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

  ){

  }

  

   verPersonaje( character : Character){
    let personajeId=character.id;
    this.router.navigate(['/characterDetails/', personajeId]);
   }

   //metofo para añadir a favoritos
   toggleFavorite(character: Character, event : Event){
    event.stopPropagation(); // Evita que el evento click en el botón propague al contenedor
    character.isFavorite = !character.isFavorite;
    if (character.isFavorite) {
      this.rickyMortyService.addFavorito(character)
        .then(() => {
          console.log('Personaje añadido a favoritos:', character);
        })
        .catch((error: any) => {
          console.error('Error al añadir a favoritos:', error);
        });
   

   } else if(!character.isFavorite){
    this.rickyMortyService.deleteFavorito(character)
      .then(() => {
        console.log('Personaje eliminado de favoritos:', character);
        
      } )
      .catch((error : any) => {
        console.log('Error al eliminar el personaje:', error);
      })
      
   }

}
}
