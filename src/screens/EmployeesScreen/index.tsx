import { useEffect, useState } from 'react'
import { Alert, Backdrop, CircularProgress, Grid, Snackbar, Typography } from '@mui/material'
import type { AlertColor } from '@mui/material'

import type { Employees } from 'src/types'
import { employeeService } from 'src/services/employeeService'
import { BaseScreenLayout } from '../layouts/BaseScreenLayout'
import { EmployeesList } from './components'
import { EmployeeCard } from 'src/components'

type Snackbar = {
  isOpen: boolean
  status: AlertColor
  message: string
}

export function EmployeesScreen() {
  const [employees, setEmployees] = useState<Employees>([])
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState<Snackbar>({ isOpen: false, status: 'info', message: '' })

  async function handleGetEmployees() {
    setIsLoading(true)
    const response = await employeeService.getEmployees()

    setEmployees(response)
    setIsLoading(false)
  }

  function handleCloseSnackbar() {
    setOpenSnackbar((prevState) => ({...prevState, isOpen: false}))
  }

  async function handleDeleteEmployee(id: string) {
    try {
      setIsLoading(true)

      await employeeService.deleteEmployee(id)

      handleGetEmployees()

      setOpenSnackbar({
        isOpen: true,
        status: 'success',
        message: 'O funcionário foi removido'
      })
    } catch (error) {
      setOpenSnackbar({
        isOpen: true,
        status: 'error',
        message: 'Houve um erro ao remover o funcionário'
      })
    } finally {
      setIsLoading(false)
    }
  }

  function Loading() {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  useEffect(() => {
    handleGetEmployees()
  }, [])

  return (
    <BaseScreenLayout>
      <Typography component="h2" variant="h4" mb={4}>Funcionários</Typography>
      { isLoading && <Loading /> }
      {
        employees.length > 0 && (
          <EmployeesList>
            {
              employees.map((employee) => (
                <Grid
                  item
                  key={employee?.id}
                  component="li"
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <EmployeeCard employee={employee} onClickDelete={() => handleDeleteEmployee(employee.id)} />
                </Grid>
              ))
            }
          </EmployeesList>
        )
      }
      <Snackbar open={openSnackbar.isOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={openSnackbar.status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </BaseScreenLayout>
  )
}
