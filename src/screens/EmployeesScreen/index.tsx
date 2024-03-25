import { useEffect, useMemo, useState } from 'react'
import { Box, Chip, Grid, Typography } from '@mui/material'
import type { AlertColor } from '@mui/material'

import type { Employees, EmployeeStatus } from 'src/types'
import { employeeService } from 'src/services/employeeService'
import { BaseScreenLayout } from '../layouts/BaseScreenLayout'
import { EmployeesList } from './components'
import { EmployeeCard, SnackbarAlert, Loading } from 'src/components'

type SnackbarStateProps = {
  isOpen: boolean
  status: AlertColor
  message: string
}

type FilterEmployeeStatus = EmployeeStatus | null

export function EmployeesScreen() {
  const [employees, setEmployees] = useState<Employees>([])
  const [filterValue, setFilterValue] = useState<FilterEmployeeStatus>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState<SnackbarStateProps>({ isOpen: false, status: 'info', message: '' })

  async function handleGetEmployees() {
    try {
      setIsLoading(true)
      const response = await employeeService.getEmployees()

      setEmployees(response.data)
    } catch (error) {
      setEmployees([])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteEmployee(id: string) {
    try {
      setIsLoading(true)

      await employeeService.deleteEmployee(id)
      await handleGetEmployees()

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

  function handleCloseSnackbar() {
    setOpenSnackbar((prevState) => ({...prevState, isOpen: false}))
  }

  const filteredEmployees = useMemo(() => {
    return filterValue ? employees.filter((employee) => employee.status === filterValue) : employees
  }, [employees, filterValue])

  function handleDisabledFilter(filterValue: FilterEmployeeStatus) {
    return !(employees.some((employee) => employee.status === filterValue))
  }

  function handleSelectedFilter(selectedFilter: FilterEmployeeStatus) {
    return filterValue === selectedFilter ? 'primary' : undefined
  }

  useEffect(() => {
    handleGetEmployees()
  }, [])

  return (
    <BaseScreenLayout>
      <Typography component="h2" variant="h4" mb={4}>Funcionários</Typography>
      <Typography component="h3" variant="subtitle1" mb={2}>Estado do benefício</Typography>
      <Box mb={2} pb={2} whiteSpace="nowrap" overflow="auto">
        <Chip sx={{ mr: 2 }} label="Todos" onClick={() => setFilterValue(null)} color={handleSelectedFilter(null)} />
        <Chip sx={{ mr: 2 }} label="Ativo" onClick={() => setFilterValue('active')} color={handleSelectedFilter('active')} disabled={handleDisabledFilter('active')} />
        <Chip sx={{ mr: 2 }} label="Atrasado" onClick={() => setFilterValue('overdue')} color={handleSelectedFilter('overdue')} disabled={handleDisabledFilter('overdue')} />
        <Chip sx={{ mr: 2 }} label="Inativo" onClick={() => setFilterValue('inactive')} color={handleSelectedFilter('inactive')} disabled={handleDisabledFilter('inactive')} />
        <Chip sx={{ mr: 2 }} label="Pendente" onClick={() => setFilterValue('pending')} color={handleSelectedFilter('pending')} disabled={handleDisabledFilter('pending')} />
      </Box>
      { isLoading && <Loading isLoading={isLoading} /> }
      {
        filteredEmployees.length > 0 && (
          <EmployeesList>
            {
              filteredEmployees.map((employee) => (
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
      <SnackbarAlert
        isOpen={openSnackbar.isOpen}
        onClose={handleCloseSnackbar}
        type={openSnackbar.status}
        message={openSnackbar.message}
      />
    </BaseScreenLayout>
  )
}
