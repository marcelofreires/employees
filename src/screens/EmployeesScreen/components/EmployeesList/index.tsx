import { Grid } from '@mui/material'

import type { Employees } from 'src/types'
import { EmployeeCard } from 'src/components'

interface EmployeesListProps {
  employees: Employees
}

export function EmployeesList({ employees }: EmployeesListProps) {
  return (
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
  )
}
