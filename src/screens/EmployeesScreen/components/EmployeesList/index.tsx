import { Grid } from '@mui/material'

import type { ReactNode } from 'react'

interface EmployeesListProps {
  children: ReactNode
}

export function EmployeesList({ children }: EmployeesListProps) {
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
      {children}
    </Grid>
  )
}
