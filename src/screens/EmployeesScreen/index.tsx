import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Chip, Container, Grid, IconButton, Modal, TextField, Typography } from '@mui/material'
import type { AlertColor, Theme } from '@mui/material'
import Close from '@mui/icons-material/Close'

import type { Employees, EmployeeStatus } from 'src/types'
import { employeeService } from 'src/services/employeeService'
import { BaseScreenLayout } from '../layouts/BaseScreenLayout'
import { EmployeesList } from './components'
import { EmployeeCard, SnackbarAlert, Loading } from 'src/components'
import { TEXT_FIELD_VARIANT } from 'src/constants'

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
  const [isOpenModal, setIsOpenModal] = useState(false)

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

  function handleOpenModal() {
    setIsOpenModal(true)
  }

  function handleCloseModal() {
    setIsOpenModal(false)
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
    <>
      <BaseScreenLayout>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography component="h2" variant="h4">Funcionários</Typography>
          <Button onClick={handleOpenModal}>Adicionar funcionário</Button>
        </Box>
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
      </BaseScreenLayout>
      <SnackbarAlert
        isOpen={openSnackbar.isOpen}
        onClose={handleCloseSnackbar}
        type={openSnackbar.status}
        message={openSnackbar.message}
      />
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Container maxWidth="sm">
            <Box
              sx={(theme: Theme) => ({
                bgcolor: theme.palette.background.default,
                borderColor: theme.palette.divider,
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 2,
                p: 4,
                position: 'relative'
              })}
            >
              <Typography component="h3" variant="h5" mb={4}>Adicionar funcionário</Typography>
              <Box
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8
                }}
              >
                <IconButton aria-label="close" title="Fechar modal" onClick={handleCloseModal}>
                  <Close />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="name-field"
                    label="Nome"
                    variant={TEXT_FIELD_VARIANT}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="occupation-field"
                    label="Cargo"
                    variant={TEXT_FIELD_VARIANT}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email-field"
                    label="E-mail"
                    variant={TEXT_FIELD_VARIANT}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="document-field"
                    label="CPF"
                    variant={TEXT_FIELD_VARIANT}
                    fullWidth
                  />
                </Grid>
                <Grid container item xs={12} sm={6} ml="auto" spacing={3}>
                  <Grid item xs={6}>
                    <Button onClick={handleCloseModal} fullWidth>Cancelar</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" fullWidth>Adicionar</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  )
}
