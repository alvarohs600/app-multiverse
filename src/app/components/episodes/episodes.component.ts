import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { RickMortyService } from '../shared/services/rick-morty.service';

import { Seson1Component } from './seson1/seson1.component';
import { Seson2Component } from './seson2/seson2.component';
import { Seson3Component } from './seson3/seson3.component';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [
    LoadingComponent,
    Seson1Component,
    Seson2Component,
    Seson3Component,
    CommonModule,
  ],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {

  loading: boolean = false;
  episodes: any[] = [];
  activeComponent: string = '';
  image: boolean = true;
  private showScrollHeight = 500;
  showGoUpButton = false;
  showColum = false;
  characters: any[] = [];

  constructor(
    private service: RickMortyService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
   
  }



  @HostListener('window:scroll', [])
  windowScroll(): void {
    this.showGoUpButton = window.scrollY > this.showScrollHeight;
  }

  showSeason(component: string) {
    this.image = false;
    this.activeComponent = component;
  }

  scrollTop(): void {
    this.document.body.scrollTop = 0; // Para Safari
    this.document.documentElement.scrollTop = 0; // Para el resto de navegadores
  }

}
