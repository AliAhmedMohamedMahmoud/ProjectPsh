import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInUser } from 'src/app/Model/log-in-user';
import { LogInService } from 'src/app/Services/log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  isUserLogged:boolean=false;
  userLogIn=new LogInUser("","");
  logIn=false;
  errorMessage:string="";
  constructor(private userLoginIn:LogInService, private router:Router,private authService:LogInService) { }
 logInForm =new FormGroup({
      userName:new FormControl(""),
      password:new FormControl(""),

    })
  ngOnInit(): void {
this.isUserLogged=this.authService.isUserLogged;
  }
get Name()
{
  return this.logInForm.get("userName");
}
get password()
{
  return this.logInForm.get("password");
}
  signIn(userSignIn:LogInUser)
  {
    this.userLoginIn.signIn(userSignIn).subscribe(
      (user:any)=>{
        this.logIn=true;
        localStorage.setItem('token',user.token)
        console.log(user.token)
        this.router.navigate(["employee"])
        this.isUserLogged=this.authService.isUserLogged;
      },
      (err)=>{
this.errorMessage="Invalid username or password";
this.logIn=false;
      }
    )
  }
}
