import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocationsComponent } from '../locations/locations.component';

@Component({
  selector: 'app-carrousel-planetas',
  standalone: true,
  imports: [CommonModule,

  ],
  templateUrl: './carrousel-planetas.component.html',

})
export class CarrouselPlanetasComponent {


  planetas: string[] = [
    '../../../assets/img/planeta1.jpg',
    '../../../assets/img/planeta3.jpg',
    '../../../assets/img/planeta4.jpg',
    '../../../assets/img/planeta11.jpg',
    '../../../assets/img/planeta5.jpg',
    '../../../assets/img/planeta6.jpg',
    '../../../assets/img/planeta8.jpg',
    '../../../assets/img/planeta9.jpg',
    '../../../assets/img/planeta10.jpg',
    '../../../assets/img/planeta2.jpg',
    '../../../assets/img/planeta7.jpg',
    '../../../assets/img/planeta30.jpg',
    '../../../assets/img/planeta23.jpg',
    '../../../assets/img/planeta13.jpg',
    '../../../assets/img/planeta15.jpg',
    '../../../assets/img/planeta17.jpg',
    '../../../assets/img/planeta26.jpg',
    '../../../assets/img/planeta19.jpg',
    '../../../assets/img/planeta33.jpg',
    '../../../assets/img/planeta22.jpg',
    '../../../assets/img/planeta18.jpg',
    '../../../assets/img/planeta24.jpg',
    '../../../assets/img/planeta16.jpg',
    '../../../assets/img/planeta20.jpg',
    '../../../assets/img/planeta27.jpg',
    '../../../assets/img/planeta21.jpg',
    '../../../assets/img/planeta42.jpg',
    '../../../assets/img/planeta28.jpg',
    '../../../assets/img/planeta12.jpg',
    '../../../assets/img/planeta40.jpg',
    '../../../assets/img/planeta25.jpg',
    '../../../assets/img/planeta31.jpg',
    '../../../assets/img/planeta32.jpg',
    '../../../assets/img/planeta34.jpg',
    '../../../assets/img/planeta44.jpg',
    '../../../assets/img/planeta36.jpg',
    '../../../assets/img/planeta37.jpg',
    '../../../assets/img/planeta38.jpg',
    '../../../assets/img/planeta39.jpg',
    '../../../assets/img/planeta46.jpg',
    '../../../assets/img/planeta41.jpg',
    '../../../assets/img/planeta35.jpg',
    '../../../assets/img/planeta43.jpg',
    '../../../assets/img/planeta47.jpg',
    '../../../assets/img/planeta45.jpg',
    '../../../assets/img/planeta48.jpg',
    '../../../assets/img/planeta49.jpg',
    '../../../assets/img/planeta50.jpg',
    '../../../assets/img/planeta51.jpg',
    '../../../assets/img/planeta52.jpg',
    '../../../assets/img/planeta53.jpg',
    
    

  ];
  constructor(private locationComponent: LocationsComponent){
    this.locationComponent.images= this.planetas;
  }

  obtenerPlanetaAleatorio(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.planetas.length);
    return this.planetas[indiceAleatorio];
  }

}
