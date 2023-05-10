import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'api/companies/';

  constructor(private http: HttpClient) {}

  getCompanies() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCompany(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addCompany(Company: any) {
    return this.http.post<any>(this.apiUrl, Company);
  }

  updateCompany(Company: any) {
    const url = `${this.apiUrl}/${Company.id}`;
    return this.http.put<any>(url, Company);
  }

  deleteCompany(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}

