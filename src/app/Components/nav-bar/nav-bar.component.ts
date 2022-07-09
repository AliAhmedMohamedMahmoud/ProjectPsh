import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Services/log-in.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
isUserLogged:boolean;
  constructor(private authService:LogInService) {
    this.isUserLogged=this.authService.isUserLogged;

  }


  ngOnInit(): void {
this.authService.getLoggedStatus().subscribe(status =>{
  this.isUserLogged=status;
})
  }
  signout(){
    this.authService.logout();
    this.isUserLogged=this.authService.isUserLogged;
     }
}
