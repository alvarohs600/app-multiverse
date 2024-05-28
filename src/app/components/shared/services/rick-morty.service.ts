import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, addDoc, arrayRemove, arrayUnion, collection, collectionData, deleteDoc, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import { Character } from '../../interfaces/character.interface';


@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  
  constructor(
     private http: HttpClient,
     private router : Router,
     private firestore : Firestore,
     private auth: Auth) {}

  

  //--------------------Metodos de Autenticación Firebase-----------------------------------

  //registrar usuario y crear documento en Firestore
  registrar(email:string, password: string, nombre: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((userCredential) => {
        const user = {
          id: userCredential.user?.uid,
          email: email,
          password: password,
          nombre: nombre,
          favoritos: [],
          puntuacionMax: 0
        };
        const userDocRef = doc(this.firestore, `usuarios/${user.id}`);
        return from(setDoc(userDocRef, user));
      })
    );
  }
  
  login({email, password} : any){
    return signInWithEmailAndPassword( this.auth, email, password);
  }

  logOut(){
    return signOut(this.auth);
  }

 //----------------------------- metodos para la bbdd firestore------------------------------------------------------------------------

  // Agregar favorito al documento del usuario
  addFavorito(character: Character) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
    return from(updateDoc(userDocRef, { favoritos: arrayUnion(character) }));
  }


  // Eliminar favorito del documento del usuario
  removeFavorito(character: Character) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
    return from(updateDoc(userDocRef, { favoritos: arrayRemove(character) }));
  }

// Obtener todos los favoritos del usuario
getFavoritos() {
  const user = this.auth.currentUser;
  if (!user) {
    throw new Error('Usuario no autenticado');
  }
  const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
  return from(getDoc(userDocRef)).pipe(
    switchMap((resp) => {
      const data = resp.data();
      if (data && data['favoritos']) {
        return of(data['favoritos']);
      } else {
        return of([]);
      }
    })
  );
}


   //-------------------------------------Metodos para el consumo de API--------------------------------------------------------
  getQuery( query : string ) {
    const url=`https://rickandmortyapi.com/api/${ query }`;
   return this.http.get(url);
  }

  getPersonajes(){
    return this.getQuery('character/');
  }

  searchPersonaje(termino: string, page =1){
    return this.getQuery(`character/?name=${termino}&page=${page}`)
    .pipe( map( datos=> datos));
  }

  getLocations(){
    return this.getQuery('location/');

  };

  getCharacterDetails(id : string){
    return this.getQuery(`character/${id}`);
  };

  getCharacterByPage(pageNum : number): any{
    

  }

  getEpisodes(){
    return this.getQuery('episode');
  }


   //metodo para el breadcrumbs
  getBreadcrumbs(): Observable<string[]> {
    const breadcrumbs: string[] = ['Home', 'Characters', 'Locations', 'Episodes'];
    return of(breadcrumbs);
  }
   
    
    

  
}
