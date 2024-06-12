import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import {Firestore, arrayRemove, arrayUnion, collection, doc, getDoc,getDocs,setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import { Character } from '../../interfaces/character.interface';


@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
private loggedIn: boolean= false;

  
  constructor(
     private http: HttpClient,
     private router : Router,
     private firestore : Firestore,
     private auth: Auth) {

   
      
     }

  

  //--------------------Métodos de Autenticación Firebase-----------------------------------

  //método para registrar usuario y crear documento en Firestore
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
  //método para hacer login
  login({email, password} : any){
    this.loggedIn=true;
    
    return signInWithEmailAndPassword( this.auth, email, password);
  }
  //método para hacer logout
  logOut(){
    this.loggedIn=false;
    return signOut(this.auth);
  }
  //método para comprobar si un usuario esta logeado
  isLoggedIn():boolean{
    return this.loggedIn;
  }


 //----------------------------- metodos para la bbdd firestore------------------------------------------------------------------------

  //método para agregar favorito al documento del usuario
  addFavorito(character: Character) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    
    const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
    return from(updateDoc(userDocRef, { favoritos: arrayUnion(character) }));
  }


  //método para eliminar favorito del documento del usuario
  removeFavorito(character: Character) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
    return from(updateDoc(userDocRef, { favoritos: arrayRemove(character) }));
  }

// método para obtener todos los favoritos del usuario
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



   //-------------------------------------Métodos para el consumo de API--------------------------------------------------------

   
   //método para guardar la query y pasarle el resto de la consulta 
  getQuery( query : string ) {
    const url=`https://rickandmortyapi.com/api/${ query }`;
   return this.http.get(url);
  }
  //método para obtener todos los personajes de la API
  getPersonajes(){
    return this.getQuery('character/');
  }
  //método para filtrar los personajes por el termino escrito
  searchPersonaje(termino: string, page =1){
    return this.getQuery(`character/?name=${termino}&page=${page}`)
    .pipe( map( datos=> datos));
  }

   //método para obtener todas las localizaciones
   getAllLocations(page =1){
    return this.getQuery(`location/?page=${page}`)
    .pipe( map( datos=> datos));
  }
  //metodo para mostrar una localización por id
  getLocationById(id:string){
    return this.getQuery(`location/${id}`)
  }
  //método para obtener los personajes de las localizaciones
  getCharacterLocations(url: string): Observable<any> {
    return this.http.get(url);
  }

 
  //método para obtener las localizaciones de la aPI
  getLocations(){
    return this.getQuery('location/');

  };
  //método para obtener un personaje por su id
  getCharacterDetails(id : string){
    return this.getQuery(`character/${id}`);
  };
  //método para obtener los episodios de la API
  getEpisodes(){
    return this.getQuery('episode');
  }
  //método para obtener los episodios por sus ids.
  getSesion(ids: number [] ){
    
    return this.getQuery(`episode/${ids}`)
  }
  //para obtener los characters por su url
  getCharacterByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }


   
    
    

  
}
