import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'api/departments/';

  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDepartment(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addDepartment(department: any) {
    return this.http.post<any>(this.apiUrl, department);
  }

  updateDepartment(department: any) {
    const url = `${this.apiUrl}/${department.id}`;
    return this.http.put<any>(url, department);
  }

  deleteDepartment(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}