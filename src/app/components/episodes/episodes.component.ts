import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { RickMortyService } from '../shared/services/rick-morty.service';

import { Seson1Component } from './seson1/seson1.component';
import { Seson2Component } from './seson2/seson2.component';
import { Seson3Component } from './seson3/seson3.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [
    LoadingComponent,
    Seson1Component,
    Seson2Component,
    Seson3Component,
  ],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {

  loading: boolean= false;
  episodes: any [] = [];
  activeComponent: string ='';
  image:boolean= true;

  constructor(private service : RickMortyService){

  }
  ngOnInit(){
  }

  showSeason(component: string){
    this.image=false;
    this.activeComponent=component;
   }


}
