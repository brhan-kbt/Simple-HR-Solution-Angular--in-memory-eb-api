import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryData implements InMemoryDbService {
  createDb() {
    const candidates = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 4, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 5, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 6, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' }
    ];

    const companies = [
      { id: 1, name: 'Company A', location: 'Location A' },
      { id: 2, name: 'Company B', location: 'Location B' },
      { id: 3, name: 'Company C', location: 'Location C' },
    ];

    const employees = [
      { id: 1, name: 'John', designation: 'Manager', companyId: 1 },
      { id: 2, name: 'Jane', designation: 'Developer', companyId: 1 },
      { id: 3, name: 'Bob', designation: 'Manager', companyId: 2 },
    ];

    const departments = [
      { id: 1, name: 'Department A', companyId: 1 },
      { id: 2, name: 'Department B', companyId: 2 },
      { id: 3, name: 'Department C', companyId: 3 },
    ];

    const salaries = [
      { id: 1, amount: 50000, employeeId: 1 },
      { id: 2, amount: 60000, employeeId: 2 },
      { id: 3, amount: 70000, employeeId: 3 },
    ];

    return { candidates, companies, employees, departments, salaries };
  }
}
