import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpComponent } from './emp/emp.component';
import { Observable } from 'rxjs';
import { Department } from './department';

@Injectable({ //Ensures that service can be used by multiple components on declaration in constructor
  providedIn: 'root' //Its available in all components in current module
})
export class EmpService {

  rootURL: string //Identify the root url for webservice to declare the HTTPClient object to connect to the service
  
  constructor(private httpsvc:HttpClient) { //Initialise the url
    this.rootURL = "http://localhost:7700/employees"
  }
  // We use observable to manage HTTP communication as helper class


  // For each operation, identify the parameters and identify the type of response object
  findEmpByEmpno(empno):Observable<EmpComponent>{
    return this.httpsvc.get<EmpComponent>(this.rootURL+"/find/"+empno)
  }

  updateEmpOnServer(emp): Observable <EmpComponent>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/x-www-form-urlencoded"})
    }
    var reqBody = "empno=" + emp.empno + "&name=" + emp.name + "&salary=" + emp.salary
    return this.httpsvc.post <EmpComponent>(this.rootURL + "/register", reqBody, httpOptions)
  }

  loadAllDepartmentsFromServer(): Observable<Department[]>{
    return this.httpsvc.get<Department[]>("http://localhost:7700/departments/list")}

    updateEmployeeDepartmentOnServer(empno, depno)
    :Observable<EmpComponent>{
      const httpOptions = {
        headers: new HttpHeaders(
          {"Content-Type":"application/x-www-form-urlencoded"}
        )
      }
      // Identify the data required as Form Params
      var reqBody = "empno=" + empno + "&depno=" + depno
      // Call the POST service method using the URL, data, options
      return this.httpsvc.post<EmpComponent>(
        this.rootURL + "/assign/department", reqBody, httpOptions
      )
    }
}
