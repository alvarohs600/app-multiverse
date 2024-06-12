import { Component} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import { RickMortyService } from '../shared/services/rick-morty.service';
import{DatePipe, Location} from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Character } from '../interfaces/character.interface';




@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    DatePipe,
    NavbarComponent,
    RouterLink,
    RouterLinkActive,
    
    
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
 

})
export class CharacterDetailsComponent {


   character: any;

  constructor(private router: ActivatedRoute,
              private service: RickMortyService,
              private location: Location,
  ){

    this.router.params.subscribe( params=> {
      this.getCharacterDetails( params['id']);
    });
  }

  addFavorite(event: Event, character: Character) {
    event.stopPropagation(); // Evita que el clic en el botón dispare también el clic en la tarjeta
    this.service.addFavorito(character).subscribe({
      next: () => {
        character.isFavorite = true; // Actualiza el estado localmente
      },
      error: (error : any) => {
        console.error('Error al añadir a favoritos:', error);
      }
    });
  }
  

  getCharacterDetails(id : string){
    this.service.getCharacterDetails( id )
        .subscribe( datos => {
          this.character=datos;
        });
  }

  //metodo para volver a la pagina anterior
  goBack():void {
    
    this.location.back();
  }

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
