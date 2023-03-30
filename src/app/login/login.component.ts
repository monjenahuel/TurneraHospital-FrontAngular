import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../clases/usuario';
import { LoginServicioService } from '../Servicios/login-servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formLogin!: FormGroup;

  loginFailed:boolean = false;


  emailNoValido(){
    return (this.formLogin.get("email")?.status == "INVALID" && this.formLogin.get('email')?.touched);
  }
  
  contrasenaNoValida(){
      return (this.formLogin.get("password")?.status == "INVALID" && this.formLogin.get('password')?.touched); //this.formLogin.get("password")?.value.length < 2
  }

  

  constructor(private formBuilder: FormBuilder, private router: Router, private login:LoginServicioService){

  }
  
  ngOnInit(){
    this.formLogin = this.formBuilder.group({
      email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: ['',
      [
      Validators.required,
      Validators.minLength(8)
      ]
    ]
    })

  }

  send(){
    
    let usuarioIngresado:Usuario =new Usuario(this.formLogin.get('email')?.value,this.formLogin.get('password')?.value);

    this.login.validarUsuario(usuarioIngresado).subscribe
    (data => {
      Swal.fire(
      'Credenciales Correctas',
      'Bienvenido ' + data.username,
      'success'
    )
    
    sessionStorage.setItem("username",data.username)
    
    this.router.navigate(["/turnos"])
    },
    error => {
    
    Swal.fire(
      'Error!',
      'Credenciales incorrectas',
      'error'
    )   
    
    this.loginFailed = true;

    this.formLogin.reset();

    this.formLogin.markAllAsTouched();
          
    })

  }
}
