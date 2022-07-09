import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './Components/employee-details/employee-details.component';
import { AuthGuard } from './Components/Gaurds/auth.guard';
import { GetAllEmployeesComponent } from './Components/get-all-employees/get-all-employees.component';
import { HomeComponent } from './Components/home/home.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';

const routes: Routes = [
  {path:"employee",component:GetAllEmployeesComponent,canActivate:[AuthGuard]},
  {path:"employee",component:AddEmployeeComponent,canActivate:[AuthGuard]},

  {path:"employee/:id",component:EmployeeDetailsComponent,canActivate:[AuthGuard]},
  {path:"employee/update/:id",component:UpdateEmployeeComponent,canActivate:[AuthGuard]},
  {path:"logIn",component:LogInComponent},
  {path:"",component:LogInComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"signOut",component:LogInComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
