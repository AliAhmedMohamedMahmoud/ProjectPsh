import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/Model/employee';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Output() public onUploadFinished = new EventEmitter();
  AllDepartments:any;
  progress: number=0;
  message: string='';
  alert:boolean=false;
  employee = new Employee(0,"","","","",new Date,0);
  constructor(private employeesServices:EmployeeServiceService,private http:HttpClient) { }
  ngOnInit(): void {
    this.employeesServices.getallDepartments().subscribe(
      (data1)=>{console.log(data1)
        this.AllDepartments=data1
    })
  }
  AddNewEmployee(obj:any)
  {
    if(this.employee.firstName!=""&&this.employee.lastName!=""&&this.employee.image!=''&& this.employee.deptId!=0){
    this.employeesServices.addEmployee(obj).subscribe(()=>
    window.location.reload()
    )
    }

  }
  uploadFile = (files:any,file:string) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post("http://localhost:4265/api/Employee/uploadImage",formData, {reportProgress: true, observe: 'events'})
    .subscribe({
      next: (event) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded);
      else if (event.type === HttpEventType.Response) {
        this.employee.image=file.split('\\')[2];
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });
}
}

