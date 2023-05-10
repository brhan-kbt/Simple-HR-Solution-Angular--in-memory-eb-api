import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiUrl = 'api/candidates/';

  constructor(private http: HttpClient) {}

  getCandidates() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCandidate(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addCandidate(candidate: any) {
    return this.http.post<any>(this.apiUrl, candidate);
  }

  updateCandidate(candidate: any) {
    const url = `${this.apiUrl}/${candidate.id}`;
    return this.http.put<any>(url, candidate);
  }

  deleteCandidate(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
