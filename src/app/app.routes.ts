import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { LocationsComponent } from './components/locations/locations.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { AboutComponent } from './components/about/about.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

export const routes: Routes = [

    {path:'', pathMatch: 'full', redirectTo: '/home'}, 
    //funcion anonima para redirigir a registro si no estamos logeados
    {path: 'home', component: HomeComponent,
     ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },

    {path: 'characters', component: CharactersComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },

    {path: 'locations', component: LocationsComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },

    {path: 'episodes', component: EpisodesComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },

    {path: 'about', component: AboutComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },

    {path: 'characterDetails/:id', component: CharacterDetailsComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },

    {path: 'login', component: LoginComponent},

    {path: 'registro', component: RegistroComponent},
   
    
    // cualquier otra ruta nos redirecciona al login
    {path: '**', pathMatch: 'full', redirectTo: '/login'},
];
