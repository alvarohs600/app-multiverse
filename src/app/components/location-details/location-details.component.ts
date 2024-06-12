import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,

  ],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.css'
})
export class LocationDetailsComponent implements OnInit{

  planeta: any = {};
  locationImage: string | null = null;
  imgTierra: string = '../../../assets/img/planeta14.jpg';
  character: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private service: RickMortyService
  ) {
    this.route.params.subscribe(params => {
      this.getLocationDetails(params['id']);
    });

    this.route.queryParams.subscribe(queryParams => {
      this.locationImage = queryParams['image'];
    });
  }

  ngOnInit(): void {}

  getLocationDetails(id: string): void {
    this.service.getLocationById(id).subscribe(data => {
      this.planeta = data;
      this.planeta.residentsData = []; 
      this.fetchResidents();
    });
  }

  viewCharacterDetails(id: string) {
    this.router.navigate(['/characterDetails/', id]);
  }

  fetchResidents(): void {
    this.planeta.residents.forEach((residentUrl: string) => {
      this.service.getCharacterLocations(residentUrl).subscribe((c: any) => {
        const character: Character = {
          id: c.id,
          name: c.name,
          species: c.species,
          status: c.status,
          type: c.type,
          gender: c.gender,
          image: c.image,
          created: c.created,
          isFavorite: false
        };
        this.planeta.residentsData.push(character);
      });
    });
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Alive':
        return 'fas fa-circle text-success';
      case 'Dead':
        return 'fas fa-circle text-danger';
      default:
        return 'fas fa-circle text-secondary';
    }

    
  }

  goBack(): void{
    this.router.navigate(['/locations']);
  }
}