import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId=0;
  employeeDetails:any;
  constructor(private route:ActivatedRoute,public employeesServices:EmployeeServiceService) {
   this.employeeId =route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.employeesServices.getEmployeeById(this.employeeId).subscribe(
      (data)=>{this.employeeDetails=data},
      (err)=>{console.log(err)}
    )
  }
}
