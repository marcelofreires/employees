import { api } from 'src/api'

async function getEmployees() {
  const { data } = await api.get('/employees')

  return data
}

async function getEmployee(id: string) {
  const { data } = await api.get(`/employees/${id}`)

  return data
}

async function deleteEmployee(id: string) {
  const response = await api.delete(`/employees/${id}`)

  return response
}

export const employeeService = {
  getEmployees,
  getEmployee,
  deleteEmployee
}
