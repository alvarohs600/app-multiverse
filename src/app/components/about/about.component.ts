import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { ProyectDetailsComponent } from '../proyect-details/proyect-details.component';
import { CommonModule } from '@angular/common';
import { MeDetailsComponent } from '../me-details/me-details.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ProyectDetailsComponent,
    MeDetailsComponent,
    CommonModule

  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
 details1: boolean = false;
 details: boolean = false;
  constructor(private router: ActivatedRoute,
    private service: RickMortyService,
    ){

  }

  handlerClick(){
    this.details=!this.details;

  }
  handlerClick1(){
    this.details1=!this.details1
  }




}
