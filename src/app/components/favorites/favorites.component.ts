import { Component, NgModule, OnInit } from '@angular/core';

import { RickMortyService } from '../shared/services/rick-morty.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Character } from '../interfaces/character.interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ CommonModule,

  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  favoritos: any [] = [];


  constructor(
    private service : RickMortyService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.obtenerFavoritos();
  }

  obtenerFavoritos() {
    this.service.getFavoritos().subscribe(
      favoritos => {
        this.favoritos = favoritos;
      },
      error => {
        console.error('Error al obtener los favoritos:', error);
      }
    );
  }

  eliminarFavorito(character: Character) {
    this.service.removeFavorito(character).subscribe(
      () => {
        console.log('Favorito eliminado exitosamente');
       
        this.obtenerFavoritos();
      },
      error => {
        console.error('Error al eliminar favorito:', error);
      }
    );
  }
  verPersonaje( character : Character){
    let personajeId=character.id;
    this.router.navigate(['/characterDetails/', personajeId]);
   }


}