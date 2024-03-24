import { useEffect, useState } from 'react';
import { Typography, Grid, Box, Container, Theme, darken } from '@mui/material'

import { AppHeader, EmployeeCard } from './components'
import { Employees } from './types';
import { employeeService } from './services/employeeService';

const BACKGROUND_DARKEN_COEFFICIENT = 0.0175

function App() {
  const [employees, setEmployees] = useState<Employees>([])

  async function handleGetEmployees() {
    const response = await employeeService.getEmployees()

    setEmployees(response)
  }

  useEffect(() => {
    handleGetEmployees()
  }, [])

  return (
    <Box
      bgcolor={(theme: Theme) => darken(theme.palette.background.default, BACKGROUND_DARKEN_COEFFICIENT)}
    >
      <AppHeader />
      <Box
        component="main"
        py={{
          xs: 4,
          sm: 8
        }}
      >
        <Container component="section">
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
        </Container>
      </Box>
    </Box>
  )
}

export default App
