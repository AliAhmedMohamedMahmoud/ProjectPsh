import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Model/employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {


  constructor(private myHttp:HttpClient) { }

  getAllEmployee():Observable<Employee[]>
  {
    return this.myHttp.get<Employee[]>(`${environment.baseUrl}/Employee`);
  }
  getEmployeeById(id:number)
  {
    return this.myHttp.get(`${environment.baseUrl}/Employee/${id}`);
  }
  addEmployee(employee:Employee)
  {
    return this.myHttp.post(`${environment.baseUrl}/Employee`,employee);
  }
  updateEmployee(id:number,employee:Employee)
  {
    return this.myHttp.put(`${environment.baseUrl}/Employee/${id}`,employee);
  }
  deleteEmployee(id:number)
  {
    return this.myHttp.delete(`${environment.baseUrl}/Employee/${id}`);
  }
  getallDepartments()
  {
    return this.myHttp.get(`${environment.baseUrl}/Department`);
  }

}
