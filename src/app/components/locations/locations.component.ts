import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarrouselPlanetasComponent } from "../carrousel-planetas/carrousel-planetas.component";
import { LoadingComponent } from '../shared/loading/loading.component';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-locations',
    standalone: true,
    templateUrl: './locations.component.html',
    imports: [
      CarrouselPlanetasComponent,
      LoadingComponent,
      DatePipe,
      NavbarComponent,
      RouterLink,
      RouterLinkActive
      
      
  


    ]
})
export class LocationsComponent implements OnInit  {

  loading : boolean= true;
  locations: any [] = [];
  images: string [] =[];
  imgTierra: string = '../../../assets/img/planeta14.jpg';

  constructor(private service: RickMortyService,
    private cdr: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    
    
    this.loading= true;

    this.service.getLocations()
        .subscribe( (datos: any) => {
          this.locations= datos.results;
          this.loading= false;
          
           // Forzar una nueva detección de cambios
      this.cdr.detectChanges();
        
        })
  }

  obtenerPlanetaAleatorio(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.images.length);
    return this.images[indiceAleatorio];
  }
}

 

  

    



