
import { Component, HostListener, Inject} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { LoadingComponent } from '../shared/loading/loading.component';
import { TarjetasComponent } from '../tarjetas/tarjetas.component';
import { Character } from '../interfaces/character.interface';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';




@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
      CommonModule,
      LoadingComponent,
      TarjetasComponent,
      InfiniteScrollModule,
      NavbarComponent,
      RouterLink,
      RouterLinkActive,
    

      ],
})
export class HomeComponent  {

  personajes: Character[]= [];
  loading : boolean= true;
  nextUrl: string ='';

  constructor(
    private service: RickMortyService,
    @Inject(DOCUMENT) private document: Document
  ){
    this.loading= true;

    this.service.getPersonajes()
        .subscribe( (datos: any) => {
          this.personajes= datos.results;
          this.loading= false;
          this.nextUrl= datos.info.next
        })

  }

  //para hacer el scroll infinito
  @HostListener('window: scroll')
  windowScroll(): void {
  const yOffSet= window.pageYOffset;
  const scroll = this.document.documentElement.scroll;

  }

  scrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  scrollDown(): void {

  }

  

 

    

  
 

}
