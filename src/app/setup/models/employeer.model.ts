import { Department } from "./department.model";

export interface Employeer {
    id: string;
    name: string;
    designation: string;
    deptId: number; 
    salaryId:number;
    department?: Department;
  }