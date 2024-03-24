import { api } from 'src/api'

async function getEmployees() {
  const { data } = await api.get('/employees')

  return data
}

export const employeeService = {
  getEmployees
}
