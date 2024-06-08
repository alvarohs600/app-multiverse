import { ApplicationConfig } from '@angular/core';
//rutas
import { provideRouter } from '@angular/router';
import { routes, } from './app.routes';


import {provideHttpClient} from '@angular/common/http';
//services
import { RickMortyService } from './components/shared/services/rick-morty.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from './firebase/firebase.config';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';





export const appConfig: ApplicationConfig = {


  providers: [
    provideRouter(routes),
    RickMortyService,
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
 
};

