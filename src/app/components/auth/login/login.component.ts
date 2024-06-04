import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import { RickMortyService } from '../../shared/services/rick-morty.service';
import { Usuario } from '../../../model/usuario.model';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
    
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  error: boolean | undefined;
  formReg: FormGroup;
  errorMensaje: string = '';
  usuario: Usuario = new Usuario;
  variable : boolean = false;
  
  

  constructor(
    private service: RickMortyService,
    private router: Router,
   
  ){

    this.formReg= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
    
   
  }
    
   //metoo que se lanza cuando enviamos el formulario
    onSubmit(){
      if(this.formReg.valid){
        this.service.login(this.formReg.value)
          .then(resp=>{
            console.log(resp);
            this.router.navigate(['/home']);
          })
          .catch(errorServ=>{
            this.error=true;
            this.errorMensaje= errorServ;
          });
      }else {
      console.log('Formulario invalido');
    }
  
    }

    redirectToHome() {
      this.router.navigate(['/home']); // Redirige a la página de inicio (home)
    }

  
  

}
