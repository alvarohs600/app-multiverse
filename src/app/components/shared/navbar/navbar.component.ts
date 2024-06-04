import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { RickMortyService } from '../services/rick-morty.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    //importación en modulo para las rutas
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  showNavbar=true;
  constructor(
    private service: RickMortyService,
    private router : Router,
   
  ){

    

  }
  ngOnInit(){
   
  }
  onclick(){
    this.service.logOut()
       .then(()=>{
        this.router.navigate(['/login']);
       })
       .catch(error=> console.log(error));
  }

}
