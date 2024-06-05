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
  loading: boolean = false;
  info: { next: string | null } = { next: null }; // Corrige la definición de 'info'
  showGoUpButton = false;
  private pageNum = 1;
  private query: string = '';
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(
    private service: RickMortyService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.getDataFromService();
  }

  @HostListener('window:scroll', [])
  windowScroll(): void {
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight; // Usa 'window' para acceder a las propiedades globales

    if (isBottom && this.info.next) {
      this.scrollDown();
    }
    //para mostrar/ocultar el boton  segun la posición del scroll
    this.showGoUpButton=window.scrollY > this.showScrollHeight;
  }

  scrollDown(): void {
    this.pageNum++;
    this.getDataFromService();
  }
 //metodo para subir al principio de la pantalla
  scrollTop(): void {
    this.document.body.scrollTop = 0; // Para Safari
    this.document.documentElement.scrollTop = 0; // Para el resto de navegadores
  }

  private getDataFromService(): void {
    this.loading = true;
    this.service
      .searchPersonaje(this.query, this.pageNum)
      .pipe(take(1)) // Usa el operador take
      .subscribe((datos: any) => {
        if (datos?.results.length) {
          const { info, results } = datos;
          this.resultados = [...this.resultados, ...results];
          this.info = info;
        }
        this.loading = false;
      });
  }

  buscar(termino: string) {
    this.loading = true;
    this.service.searchPersonaje(termino).subscribe((datos: any) => {
      this.resultados = datos.results;
      this.loading = false;
    });
  }
}