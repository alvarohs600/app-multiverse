import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RickMortyService } from '../../shared/services/rick-morty.service';
import { Usuario } from '../../../model/usuario.model';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule
    ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  formReg: FormGroup;
  usuario: Usuario = new Usuario;
  errorMensaje: string = '';
  error: boolean | undefined;
 
 

constructor(
  private service: RickMortyService,
  private  router : Router){
   

   
   this.formReg= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])

   })


  
}

  ngOnInit(): void {
   this.usuario=new Usuario();
   
    
  }



 //metodo que se lanza cuando enviamos el formulario.
  onSubmit() {
    if (this.formReg.valid) {
     this.service.registrar(this.formReg.value)
      .then(resp => {
        this.router.navigate(['/login']);
      })
      .catch(errorServ=>{
        this.error=true;
        this.errorMensaje= errorServ;
      });
    }
}

}
