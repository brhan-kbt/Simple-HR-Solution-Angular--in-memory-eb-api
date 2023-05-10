import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  private apiUrl = 'api/employees/';

  constructor(private http: HttpClient) {}

  getEmployeers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmployeer(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addEmployeer(employeer: any) {
    return this.http.post<any>(this.apiUrl, employeer);
  }

  updateEmployeer(employeer: any) {
    const url = `${this.apiUrl}/${employeer.id}`;
    return this.http.put<any>(url, employeer);
  }

  deleteEmployeer(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}