
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
export class CharactersComponent implements OnInit{

  resultados: Character [] = [];
  loading: boolean = false;
  info : RequestInfo = {
    next: '',
  };
  showGoUpButton= false;
  private pageNum= 1;
  private query: string = '';
  private hideScrollHeight= 200;
  private showScrollHeight= 500;

  //lo guardamos en un observable
  public characterResoult$!: Observable<Character>;

  constructor(private service: RickMortyService,
    @Inject(DOCUMENT) private document: Document,
  ){}

  ngOnInit(): void {
    this.getDataFromService;
  }

  /*@HostListener es un decorador que declara un evento DOM para escuchar y proporcionar
   un metodo de controlador para ejecutarse cuando se produce ese evento.
   */
  @HostListener('window:scroll',[])
  windowScroll(): void{

    const YoffSet = window.pageYOffset;
    if((YoffSet || this.document.documentElement.scrollTop
      || this.document.body.scrollTop) > this.showScrollHeight){
        this.showGoUpButton = true;
      }else if(this.showGoUpButton && ( YoffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop ) <
    this.hideScrollHeight){
      this.showGoUpButton= false;
    }

  }
  scrollDown(): void{

    if(this.info.next){
      this.pageNum++;
      this.getDataFromService();
    }
  }

  scrollTop(): void {
    this.document.body.scrollTop=0; //para Safari
    this.document.documentElement.scrollTop= 0; //para el resto de navegadores
  }

  private getDataFromService(): void {
    this.service.searchPersonaje(this.query, this.pageNum)
    .pipe(take(1))
    .subscribe((datos: any) => {

     if(datos?.results.length){

      const { info, results } = datos;
      this.resultados = [ ...this.resultados, ...results];
      this.info= info;

     } else {
      this.resultados= [];
       }
      
    });
  }

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
