import { api } from 'src/api'
import type { Employee } from 'src/types'

async function getEmployees() {
  const response = await api.get('/employees')

  return response
}

async function getEmployee(id: string) {
  const { data } = await api.get(`/employees/${id}`)

  return data
}

async function deleteEmployee(id: string) {
  const response = await api.delete(`/employees/${id}`)

  return response
}

interface CreateEmployeeProps extends Omit<Employee, 'id' | 'status'> {
  status: string
}

async function createEmployee(employee: CreateEmployeeProps) {
  const response = await api.post('/employees', employee)

  return response
}

export const employeeService = {
  getEmployees,
  getEmployee,
  deleteEmployee,
  createEmployee,
}
