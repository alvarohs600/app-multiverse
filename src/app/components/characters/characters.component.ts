
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';

import { Observable, take } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Character } from '../interfaces/character.interface';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { TarjetasComponent } from '../tarjetas/tarjetas.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

type RequestInfo = {
  next: string;
}

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    TarjetasComponent,
    LoadingComponent,
    InfiniteScrollModule,
    NavbarComponent,
    RouterLink,
    RouterLinkActive

    
  ],
  templateUrl: './characters.component.html',
  
})
export class CharactersComponent {

  resultados: Character [] = [];
  loading: boolean = false;
 

  constructor(private service: RickMortyService,
    
  ){}



  buscar(termino: string){
    this.loading= true;
    this.service.searchPersonaje(termino)
        .subscribe( (datos: any ) => {
          console.log(datos.results);
          this.resultados= datos.results;
          this.loading= false;
        });

  }

  

}
