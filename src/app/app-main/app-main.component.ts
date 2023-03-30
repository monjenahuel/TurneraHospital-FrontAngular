import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent {

  username:string = sessionStorage.getItem("username") || "Username"

  constructor(private router:Router){}
  
  ngOnInit(){
    if(this.username == "Username"){
      this.router.navigate(["/login"])
    }
  }

  logOut(){
    sessionStorage.clear()
    this.router.navigate(["/login"])
  }


}
