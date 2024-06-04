import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { LocationsComponent } from './components/locations/locations.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { AboutComponent } from './components/about/about.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { loginGuardGuard } from './components/guards/login-guard.guard';



export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'home', component: HomeComponent, canActivate: [loginGuardGuard] },
  { path: 'characters', component: CharactersComponent, canActivate: [loginGuardGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [loginGuardGuard] },
  { path: 'locations', component: LocationsComponent, canActivate: [loginGuardGuard] },
  { path: 'episodes', component: EpisodesComponent, canActivate: [loginGuardGuard] },
  { path: 'about', component: AboutComponent, canActivate: [loginGuardGuard] },
  { path: 'characterDetails/:id', component: CharacterDetailsComponent, canActivate: [loginGuardGuard] },
  { path: 'not-found', component: NotFoundComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', pathMatch:'full', redirectTo: '/login' }
];
