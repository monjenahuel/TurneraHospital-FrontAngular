import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      return (this.formLogin.get("password")?.value.length < 1 && this.formLogin.get('password')?.touched);
  }

  

  constructor(private formBuilder: FormBuilder, private router: Router){

  }
  
  ngOnInit(){
    this.formLogin = this.formBuilder.group({
      email: ['admin@admin.com',//admin@admin.com
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: ['12345678',
      [
      Validators.required,
      Validators.minLength(8)
      ]
    ]
    })

  }

  send(){
    
    let credencialesCorrectas = {
      "email": "admin@admin.com",
      "password": "12345678"
  } 

  if(JSON.stringify(this.formLogin.value) == JSON.stringify(credencialesCorrectas)){
    this.router.navigate(["/turnos"])
  }else{
    this.loginFailed = true;    
  }
  }
}
