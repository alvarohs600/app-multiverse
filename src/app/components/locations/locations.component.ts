import { ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { CarrouselPlanetasComponent } from "../carrousel-planetas/carrousel-planetas.component";
import { LoadingComponent } from '../shared/loading/loading.component';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { CommonModule, DOCUMENT, DatePipe } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { take } from 'rxjs';
import { LocationDetailsComponent } from '../location-details/location-details.component';
import { Location } from '../interfaces/location.interface';

@Component({
    selector: 'app-locations',
    standalone: true,
    templateUrl: './locations.component.html',
    styleUrl: './locations.component.css',
    imports: [
      CarrouselPlanetasComponent,
      LoadingComponent,
      DatePipe,
      NavbarComponent,
      RouterLink,
      RouterLinkActive,
      CommonModule,
      LocationDetailsComponent
    ]
})
export class LocationsComponent implements OnInit  {
  loading : boolean = true;
  locations: Location[] = [];
  images: string[] = [];
  imgTierra: string = '../../../assets/img/planeta14.jpg';
  info: { next: string | null } = { next: null }; 
  showGoUpButton = false;
  private pageNum = 1;
  private showScrollHeight = 500;
  notFound = false;
  locationImages: { [key: number]: string } = {};

  constructor(private service: RickMortyService, private router : Router,
    @Inject(DOCUMENT) private document: Document
  ){}

  ngOnInit(): void {
   this.obtenerDatos();
  }

  @HostListener('window:scroll', [])
  windowScroll(): void {
    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isBottom && this.info.next) {
      this.scrollDown();
    }

    this.showGoUpButton = window.scrollY > this.showScrollHeight;
  }
//metodo para obtener todas las localizaciones de la API
  private obtenerDatos(): void {
    this.loading = true;
    this.service
      .getAllLocations(this.pageNum)
      .pipe(take(1))
      .subscribe((datos: any) => {
        if (datos?.results.length) {
          const { info, results } = datos;
          this.locations = [...this.locations, ...results];
          this.info = info;
          this.imagesToLocations();
        }
        this.loading = false;
      });
  }
//metodo para asignar una imagen a la localización
  private imagesToLocations(): void {
    this.locations.forEach(location => {
      if (!this.locationImages[location.id]) {
        this.locationImages[location.id] = this.obtenerPlanetaAleatorio();
      }
    });
  }
//metodo pra obetener una imagen aleatoria dentro de images[]
  obtenerPlanetaAleatorio(): string {
    const aleatorio = Math.floor(Math.random() * this.images.length);
    return this.images[aleatorio];
  }

  scrollDown(): void {
    this.pageNum++;
    this.obtenerDatos();
  }

  scrollTop(): void {
    this.document.body.scrollTop = 0; 
    this.document.documentElement.scrollTop = 0; 
  }
  //metodo para redirigir a locations details
  goToLocationDetails(id: number): void {
    const locationImage = this.locationImages[id];
    this.router.navigate(['/locationDetails', id], { queryParams: { image: locationImage } });
  }
}