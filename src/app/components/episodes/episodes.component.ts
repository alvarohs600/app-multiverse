import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [LoadingComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit {

  loading: boolean= true;
  episodes: any [] = [];

  constructor(private service : RickMortyService){

  }
  ngOnInit(){
    this.loading=true;
    this.service.getEpisodes()
        .subscribe((datos: any) => {
          this.episodes= datos.results;
          this.loading= false;
        })
  }


}
