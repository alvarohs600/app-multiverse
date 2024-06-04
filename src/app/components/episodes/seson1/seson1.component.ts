import { Component, OnInit } from '@angular/core';
import { EpisodesComponent } from '../episodes.component';
import { RickMortyService } from '../../shared/services/rick-morty.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Episodes } from '../../interfaces/episode.interface';
import { TarjetaSesonsComponent } from "../tarjeta-sesons/tarjeta-sesons.component";


@Component({
    selector: 'app-seson1',
    standalone: true,
    templateUrl: './seson1.component.html',
    styleUrl: './seson1.component.css',
    imports: [
        EpisodesComponent,
        LoadingComponent,
        TarjetaSesonsComponent
    ]
})
export class Seson1Component implements OnInit {

  loading:boolean=true;
  sesion1: Episodes []=[] ;
  idsEpisodes: number[] =[1,2,3,4,5,6,7,8,9,10,11];
  pathVideo: string = '../../../../assets/video/season1.mp4';
  pathImg: string = '../../../../assets/img/season1.jpg';

  constructor(private service: RickMortyService){

  }

  ngOnInit(): void {
    this.loading=true;
    this.service.getSesion(this.idsEpisodes)
        .subscribe((datos: any)=>{
          this.sesion1=datos;
          this.loading=false;
          console.log(this.sesion1);
        })
    
  }
}
