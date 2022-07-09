import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Model/employee';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
@Component({
  selector: 'app-get-all-employees',
  templateUrl: './get-all-employees.component.html',
  styleUrls: ['./get-all-employees.component.css']
})
export class GetAllEmployeesComponent implements OnInit {
  employeeName:string="";
  employees:Employee[]=[];
  constructor(public employeesServices:EmployeeServiceService) {
   }
  ngOnInit(): void {
    this.employeesServices.getAllEmployee().subscribe(
      (data)=>{this.employees=data},
      (err)=>{alert(err)}
    )}
  delete(employeeId:number)
  {
    if( confirm("are you sure delete Employee")){
    this.employeesServices.deleteEmployee(employeeId).subscribe(()=>{
        alert("success delete Employee")
        this.ngOnInit()
      })
    }
  }
  }
