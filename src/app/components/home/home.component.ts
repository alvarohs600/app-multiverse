import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { take } from 'rxjs/operators'; // Importa el operador take

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
  styleUrls: ['./home.component.css'], // Usa 'styleUrls' en lugar de 'styleUrl'
  imports: [
    CommonModule,
    LoadingComponent,
    TarjetasComponent,
    InfiniteScrollModule,
    NavbarComponent,
    RouterLink,
    RouterLinkActive
  ],
})
export class HomeComponent implements OnInit {
  resultados: Character[] = [];
  resulBusqueda: Character[] = [];
  loading: boolean = false;
  info: { next: string | null } = { next: null }; // Corrige la definición de 'info'
  showGoUpButton = false;
  private pageNum = 1;
  private query: string = '';
  private showScrollHeight = 500;
  notFound=false;

  constructor(
    private service: RickMortyService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  /**método se llama cada vez que ocurre un evento scroll en la pantalla
   * Su función principal es verificar si se llega al final de la pantalla
   * se llama al método scrollDown() que lo que hace es hacer una nueva petición
   * a la API con la página siguiente
   */
  @HostListener('window:scroll', [])
  windowScroll(): void {
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight; 

    if (isBottom && this.info.next) {
      this.scrollDown();
    }
    
    this.showGoUpButton=window.scrollY > this.showScrollHeight;
  }
  /**
   * Éste método incrementa en uno la pagina y vuelve a hacer una nueva petición a la API
   * para obtener los datos de la siguiente página según se vaya haciendo scroll hacia abajo.
   */
  scrollDown(): void {
    this.pageNum++;
    this.obtenerDatos();
  }
 //metodo para subir al principio de la pantalla
  scrollTop(): void {
    this.document.body.scrollTop = 0; // Para Safari
    this.document.documentElement.scrollTop = 0; // Para el resto de navegadores
  }

  /**método para obtener datos del servicio de los personajes, pasandole como parámetro
  la query y el numero de página, cuando recibe los datos los concatena con los datos
  ya guardados en this.resultados
  */
  private obtenerDatos(): void {
    this.loading = true;
    this.service
      .searchPersonaje(this.query, this.pageNum)
      .pipe(take(1)) 
      .subscribe((datos: any) => {
        if (datos?.results.length) {
          const { info, results } = datos;
          this.resultados = [...this.resultados, ...results];
          this.info = info;
        }
        this.loading = false;
      });
  }
//metodo para hacer la consulta a la API filtrando personajes por el termino introducido como parámetro
  buscar(termino: string) {
    this.loading = true;
    this.service.searchPersonaje(termino).subscribe((datos: any) => {
      this.resulBusqueda = datos.results;
      if( termino.length > 3 && this.resulBusqueda.length===0){
          this.notFound=true;
      }
      this.loading = false;
    });
  }
}