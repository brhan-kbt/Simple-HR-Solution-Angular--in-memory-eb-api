import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private apiUrl = 'api/salaries/';

  constructor(private http: HttpClient) {}

  getSalaries() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSalary(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addSalary(salary: any) {
    return this.http.post<any>(this.apiUrl, salary);
  }

  updateSalary(salary: any) {
    const url = `${this.apiUrl}/${salary.id}`;
    return this.http.put<any>(url, salary);
  }

  deleteSalary(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}