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
    event.stopPropagation(); 
    this.rickyMortyService.addFavorito(character).subscribe({
      next: () => {
        character.isFavorite = true; 
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
//metodo para poner un icono u otro dependiendo del status
   getStatusIcon(status: string): string {
    switch (status) {
      case 'Alive':
        return 'fas fa-circle text-success';
      case 'Dead':
        return 'fas fa-circle text-danger';
      default:
        return 'fas fa-circle text-secondary';
    }
   
}
//metodo para poner un icono dependiendo del genero
getGenderIcon(gender: string): string {
  switch (gender) {
    case 'Male':
      return 'fas fa-mars';
    case 'Female':
      return 'fas fa-venus';
    default:
      return 'fas fa-question-circle';
  }
}
//metodo para poner un icono dependiendo de su especie
getSpecieIcon(specie: string): string {
  switch (specie) {
    case 'Human':
      return 'fas fa-user';
    case 'Alien':
      return 'fa-brands fa-reddit-alien';
    case 'Robot':
      return 'fas fa-robot';
    default:
      return 'fas fa-question-circle';
  }
}

getStarsIcon(episodes: number) {
  const star = '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>';
  if (episodes>1 && episodes<3) {
    return star.repeat(2); 
  } else if ( episodes>=3 && episodes <=40) {
    return star.repeat(3); 
  } else if (episodes >40 && episodes<45) {
    return star.repeat(4); 
  } else if (episodes > 50) {
    return star.repeat(5); 
  }else{
    return  star; 
  }
}
}