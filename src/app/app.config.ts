import { ApplicationConfig, importProvidersFrom } from '@angular/core';
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
    //funcion para pasar nuestras rutas y que queden configuradas.
    provideRouter(routes),
    RickMortyService,
    provideHttpClient(),
     importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
     importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"login-app-f530a","appId":"1:170807858120:web:75ef99ad41b2823d57e6fd","storageBucket":"login-app-f530a.appspot.com","apiKey":"AIzaSyAhz4gSKEp6K41Vt-YxfVfKtcV0DLL5TK4","authDomain":"login-app-f530a.firebaseapp.com","messagingSenderId":"170807858120"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())),


  ]
 
};

