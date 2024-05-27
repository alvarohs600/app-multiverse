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

  goBack():void {
    //para volver atras.
    this.location.back();
  }


  

}
