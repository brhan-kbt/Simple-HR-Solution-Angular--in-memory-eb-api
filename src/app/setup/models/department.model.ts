import { Company } from "./company.model";

export interface Department {
    id: number;
    name: string;
    companyId: string;
    company?:Company;
  }