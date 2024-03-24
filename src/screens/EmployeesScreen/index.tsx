import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { EmployeeCard } from 'src/components'
import { Employees } from 'src/types'
import { employeeService } from 'src/services/employeeService'
import { BaseScreenLayout } from '../layouts/BaseScreenLayout'

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
      <Box>
        <Typography
          component="h2"
          variant="h4"
          mb={4}
        >
          Funcionários
        </Typography>
      </Box>
      <Box>
        <Grid
          container
          spacing={{
            xs: 4,
            lg: 6,
          }}
          component="ul"
          sx={{
            listStyleType: 'none',
            pl: 0
          }}
        >
          {employees.map((employee) => (
            <Grid
              item
              key={employee?.id}
              component="li"
              xs={12}
              sm={6}
              md={4}
            >
              <EmployeeCard employee={employee} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </BaseScreenLayout>
  )
}
