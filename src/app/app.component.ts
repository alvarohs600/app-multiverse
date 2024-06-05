import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { AsyncPipe, CommonModule } from '@angular/common';
import { RickMortyService } from './components/shared/services/rick-morty.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavbarComponent,
    AsyncPipe,
    RouterLinkActive,
    
  
  ],
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'multiversoR';
  showNavbar : boolean= true;
  

  constructor(private router : Router, private service: RickMortyService,
  ){

    this.router.events.subscribe(event=> {
      if( event instanceof NavigationEnd){
        this.checkRoute(event.url)
      }
    })

 
    
  }
  ngOnInit() {
   
  }

  
  //metodo para verificar ruta actual y saber si el usuario esta loggeado o no.
  checkRoute(url: string): void {
    console.log(url)
    console.log(this.service.isLoggedIn());
    console.log( ((url != '/login' && url != '/registro') && this.service.isLoggedIn() ));
    this.showNavbar = ((url != '/' && url != '/registro') && this.service.isLoggedIn() );
  }

 
 

}
