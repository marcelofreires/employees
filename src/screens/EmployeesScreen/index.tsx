import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'

import type { Employees } from 'src/types'
import { employeeService } from 'src/services/employeeService'
import { BaseScreenLayout } from '../layouts/BaseScreenLayout'
import { EmployeesList } from './components'

export function EmployeesScreen() {
  const [employees, setEmployees] = useState<Employees>([])

  async function handleGetEmployees() {
    const response = await employeeService.getEmployees()

    setEmployees(response)
  }

  useEffect(() => {
    handleGetEmployees()
  }, [])

  return (
    <BaseScreenLayout>
      <Typography component="h2" variant="h4" mb={4}>Funcionários</Typography>
      { employees.length > 0 && <EmployeesList employees={employees} /> }
    </BaseScreenLayout>
  )
}
