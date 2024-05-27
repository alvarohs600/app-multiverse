import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
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

  //registrar usuario
  registrar({email, password} : any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  
  login({email, password} : any){
    return signInWithEmailAndPassword( this.auth, email, password);
  }

  logOut(){
    return signOut(this.auth);
  }

  //metodos para la bbdd firestore

  addFavorito( character : Character){

    const characterRef = collection(this.firestore, 'favoritos');
    return addDoc(characterRef, character);
  }

  deleteFavorito( character : Character){

    const tareaDocRef = doc(this.firestore, `favoritos/${character.id}`);
    return deleteDoc ( tareaDocRef);
  }

  getFavoritos() : Observable <Character[]>{
    const characterRef = collection (this.firestore, 'favoritos');
    return collectionData(characterRef,{idField: 'id'}) as Observable<Character[]>
  }


   //metodos para el consumo de API
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
