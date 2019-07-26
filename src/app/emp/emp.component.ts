import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { Project } from '../project';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {

  empno: number
  name: string
  salary: number
  currentDepartment: Department
  assignments: Project[]
  isEditable: boolean
  isProjectFormVisible: boolean
  isProjectFormValid: boolean
  invalidFormMessage: String

  allDepartments: Department[]
  selectedDepno: number

  // Informing Angular to provide/inject the object of EmpService for EmpComponent
  constructor(private empSvc:EmpService) { //Initialise sample data for each member
    this.isEditable = false
    this.isProjectFormValid = true
    this.invalidFormMessage = "Project ID must be a number"
    this.empno = 47
    this.name = "Mr Fiddles"
    this.salary = 78247834

    this.currentDepartment = {
      depno: 34,
      name: "Admin",
      location: "Netherlands"
    }

    this.assignments =[{
        proid: 44, 
        name: "Alpha", 
        customer: "Ikea"},
      {
        proid: 45,
        name: "Delta",
        customer: "Smugglers"}]
   }

   // Initialise the data from service using init method
  ngOnInit() {// Will be called by angular after object creation by default
   this.fetchCurrentEmployeeFromService()
  }
  fetchCurrentEmployeeFromService(){
    this.empSvc.findEmpByEmpno(this.empno).subscribe(
      response => { // Assign the data received from server as response to the current component
        this.empno = response.empno
        this.name = response.name
        this.salary = response.salary
        this.currentDepartment = response.currentDepartment
        this.assignments = response.assignments
      }
    )
  }

  showProjectForm(){
    this.isProjectFormVisible = true
  }

  addNewProject(pid, pname, pcustomer) {
    if(isNaN(pid))
    {
      this.isProjectFormValid = false
      this.invalidFormMessage = "Project ID must be a number"
    }
    else if(pname.length<4){
      this.isProjectFormValid = false
      this.invalidFormMessage = "Project name must be greater than 4 characters"
    }
    else{
    this.assignments.push({
      proid: pid, name: pname, customer: pcustomer})
      this.isProjectFormVisible = false
      this.isProjectFormValid = true
      this.invalidFormMessage = ""
  }
}

  deleteProject(index){
    //Deletes 1 element from the index specified
    this.assignments.splice(index, 1)
  }

  toggleEdits(){
    this.isEditable = !this.isEditable
    this.updateEmployeeDetails()
    this.loadAllDepartments()
  }

  updateSelection(depno){
    this.selectedDepno = depno
  }

  loadAllDepartments(){
    this.empSvc.loadAllDepartmentsFromServer().subscribe(
      response =>{this.allDepartments = response})
  }

  updateEmployeeDetails(){
    this.empSvc.updateEmpOnServer({
      empno: this.empno, name: this.name, salary: this.salary}).subscribe(
      response =>{ // Perform the following operation on successful post
        this.empSvc.updateEmployeeDepartmentOnServer
        (this.empno, this.selectedDepno).subscribe(
          responseDept =>{
        
       this.fetchCurrentEmployeeFromService()
        }
      )
    })
  }
}