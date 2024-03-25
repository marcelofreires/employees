import { api } from 'src/api'

async function getEmployees() {
  const { data } = await api.get('/employees')

  return data
}

async function getEmployee(id: string) {
  const { data } = await api.get(`/employees/${id}`)

  return data
}

export const employeeService = {
  getEmployees,
  getEmployee
}
