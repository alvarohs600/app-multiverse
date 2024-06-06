import { Component} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import { RickMortyService } from '../shared/services/rick-morty.service';
import{DatePipe, Location} from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';




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
  

  getCharacterDetails(id : string){
    this.service.getCharacterDetails( id )
        .subscribe( datos => {
          console.log(datos);
          this.character=datos;
        });
  }

  //metodo para volver a la pagina anterior
  goBack():void {
    
    this.location.back();
  }

  getGenderIcon(gender: string): string {
    switch (gender) {
      case 'male':
        return 'fas fa-mars';
      case 'female':
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


  

}
