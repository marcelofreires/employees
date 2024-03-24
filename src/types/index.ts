export interface Employee {
  id: string
  name: string
  email: string
  document: string
  occupation: string
  status: EmployeeStatus
}

export type EmployeeStatus = "active" | "inactive" | "overdue" | "pending"

export type Employees = Employee[]
