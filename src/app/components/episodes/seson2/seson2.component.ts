import { Component, OnInit } from '@angular/core';
import { Episodes } from '../../interfaces/episode.interface';
import { RickMortyService } from '../../shared/services/rick-morty.service';
import { TarjetaSesonsComponent } from "../tarjeta-sesons/tarjeta-sesons.component";

@Component({
    selector: 'app-seson2',
    standalone: true,
    templateUrl: './seson2.component.html',
    styleUrl: './seson2.component.css',
    imports: [TarjetaSesonsComponent]
})
export class Seson2Component implements OnInit {
  loading:boolean=true;
  sesion2: Episodes []=[] ;
  idsEpisodes: number[] =[12,13,14,15,16,17,18,19,20,21];
  pathVideo: string = '../../../../assets/video/season2.mp4';
  pathImg: string = '../../../../assets/img/season2.jpg';

  constructor(private service:RickMortyService){

  }

ngOnInit(): void {
  this.loading=true;
  this.service.getSesion(this.idsEpisodes)
      .subscribe((datos: any)=>{
        this.sesion2=datos;
        this.loading=false;
        console.log(this.sesion2);
      })
}
}
