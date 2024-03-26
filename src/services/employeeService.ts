import { api } from 'src/api'
import type { Employee } from 'src/types'

interface EmployeeProps extends Omit<Employee, 'id' | 'status'> {
  status: string
}

interface UpdateEmployeeProps {
  employeeData: Partial<EmployeeProps>
  employeeId: string
}

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

async function createEmployee(employee: EmployeeProps) {
  const response = await api.post('/employees', employee)

  return response
}

async function updateEmployee({ employeeId, employeeData }: UpdateEmployeeProps) {
  const response = await api.patch(`/employees/${employeeId}`, {...employeeData})

  return response
}

export const employeeService = {
  getEmployees,
  getEmployee,
  deleteEmployee,
  createEmployee,
  updateEmployee,
}
