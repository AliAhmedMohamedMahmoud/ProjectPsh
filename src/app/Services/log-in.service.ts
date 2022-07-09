import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogInUser } from '../Model/log-in-user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
private isLoggedSubject:BehaviorSubject<boolean>;
  constructor(private myHttp:HttpClient) {
    this.isLoggedSubject=new BehaviorSubject<boolean>(this.isUserLogged);
   }

  signIn(user:LogInUser)
  {
     this.isLoggedSubject.next(true)
    return this.myHttp.post(`${environment.baseUrl}/Account/login`,user);
  }
  get isUserLogged():boolean
  {
    return (localStorage.getItem('token'))?true:false
  }
  logout ()
  {
     localStorage.removeItem("token");
     this.isLoggedSubject.next(false)
  }
  getLoggedStatus():Observable<boolean>{
    return this.isLoggedSubject.asObservable();
  }
}
