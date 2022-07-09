import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  @Output() public onUploadFinished = new EventEmitter();
  employeesUpdate:any;
  progress: number=0;
  message: string='';
  alert:boolean=false;
  AllDepartments:any;
  submit:boolean=false;
  editEmployee=new FormGroup({
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    birthDate:new FormControl(''),
    phone:new FormControl(''),
    deptId:new FormControl(''),
    image:new FormControl(''),
  })
  constructor(private route: ActivatedRoute ,  public employeesServices:EmployeeServiceService,private http:HttpClient) { }

  ngOnInit(): void {
    this.employeesServices.getEmployeeById(this.route.snapshot.params["id"]).subscribe((data)=>
    {
      this.employeesUpdate= data
      this.editEmployee=new FormGroup({
        firstName:new FormControl( this.employeesUpdate.firstName,[Validators.required,Validators.minLength(3)]),
        lastName:new FormControl(this.employeesUpdate.lastName,[Validators.required,Validators.minLength(3)]),
        phone:new FormControl(this.employeesUpdate.phone,[Validators.required,Validators.minLength(11)]),
        birthDate:new FormControl(this.employeesUpdate.birthDate.toString().substring(0,10),[Validators.required]),
        deptId:new FormControl(this.employeesUpdate.deptId)
      })})
     this.employeesServices.getallDepartments().subscribe(
      (data1)=>{
          this.AllDepartments= data1
    })
  }
  get firstNameValid(){
    return this.submit && this.editEmployee.controls["firstName"].invalid;
  }
  get lastNameValue(){
    return this.submit && this.editEmployee.controls["lastName"].invalid;
  }
  get phoneValid(){
    return this.submit && this.editEmployee.controls["phone"].invalid;
  }
  get birthDateValid(){
    return this.submit && this.editEmployee.controls["birthDate"].invalid;
  }

  updateEmployee()
  {
    this.submit=true;
    if(this.editEmployee.valid){
    this.employeesServices.updateEmployee(this.route.snapshot.params["id"],this.editEmployee.value).subscribe(
      (data)=>{
        console.log(data)
        this.alert=true;
      }
    )}
  }
  closeAlert()
  {
     this.alert=false;
  }

}
