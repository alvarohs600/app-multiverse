import { Component, OnInit } from '@angular/core';
import { RickMortyService } from '../../shared/services/rick-morty.service';
import { Episodes } from '../../interfaces/episode.interface';
import { TarjetaSesonsComponent } from "../tarjeta-sesons/tarjeta-sesons.component";

@Component({
    selector: 'app-seson3',
    standalone: true,
    templateUrl: './seson3.component.html',
    styleUrl: './seson3.component.css',
    imports: [TarjetaSesonsComponent]
})
export class Seson3Component implements OnInit {

  
  loading:boolean=true;
  sesion3: Episodes []=[] ;
  idsEpisodes: number[] =[22,23,24,25,26,27,28,29];
  pathVideo: string = '../../../../assets/video/season3.mp4';
  pathImg: string = '../../../../assets/img/season3.jpg';

  constructor(private service: RickMortyService){

  }

  ngOnInit(): void {
    this.loading=true;
    this.service.getSesion(this.idsEpisodes)
        .subscribe((datos: any)=>{
          this.sesion3=datos;
          this.loading=false;
          console.log(this.sesion3);
        })
    
  }

}
