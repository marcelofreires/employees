import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Chip, CircularProgress, Container, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import type { AlertColor, Theme } from '@mui/material'
import Close from '@mui/icons-material/Close'
import { useFormik } from 'formik'
import * as yup from 'yup'

import type { Employees, EmployeeStatus } from 'src/types'
import { employeeService } from 'src/services/employeeService'
import { BaseScreenLayout } from '../layouts/BaseScreenLayout'
import { EmployeesList } from './components'
import { EmployeeCard, SnackbarAlert, Loading } from 'src/components'
import { EmployeeStatusLabel, TEXT_FIELD_VARIANT } from 'src/constants'

type SnackbarStateProps = {
  isOpen: boolean
  status: AlertColor
  message: string
}

type FilterEmployeeStatus = EmployeeStatus | null

type FormValues = {
  name: string
  occupation: string
  email: string
  document: string
  status: string
}

const STATUS = ['active', 'inactive', 'pending', 'overdue']

const REGEX_TO_ONLY_NUMBERS = /^\d+$/
const DOCUMENT_FIELD_MAX_LENGTH = 11

const validationSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório'),
  occupation: yup
    .string()
    .nullable(),
  email: yup
    .string()
    .email('Adicione um e-mail válido')
    .required('O e-mail é obrigatório'),
  document: yup
    .string()
    .matches(
      REGEX_TO_ONLY_NUMBERS,
      'O CPF possui apenas números'
    )
    .min(DOCUMENT_FIELD_MAX_LENGTH, 'O CPF possui 11 números')
    .required('O CPF é obrigatório'),
  status: yup
    .string()
    .required('O estado do benefício é obrigatório')
})


export function EmployeesScreen() {
  const [employees, setEmployees] = useState<Employees>([])
  const [filterValue, setFilterValue] = useState<FilterEmployeeStatus>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState<SnackbarStateProps>({ isOpen: false, status: 'info', message: '' })
  const [isOpenModal, setIsOpenModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      occupation: '',
      email: '',
      document: '',
      status: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await handleCreateEmployee(values)
    },
  })

  async function handleCreateEmployee(values: FormValues) {
    try {
      await employeeService.createEmployee(values)
      await handleGetEmployees()
      handleCloseModal()
      handleOpenSnackbar({ status: 'success', message: 'O funcionário foi adicionado' })
    } catch (error) {
      handleOpenSnackbar({ status: 'error', message: 'Houve um erro ao adicionar o funcionário' })
    }
  }

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
      handleOpenSnackbar({ status: 'success', message: 'O funcionário foi removido' })
    } catch (error) {
      handleOpenSnackbar({ status: 'error', message: 'Houve um erro ao remover o funcionário' })
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenSnackbar({status, message}: Omit<SnackbarStateProps, 'isOpen'>) {
    setOpenSnackbar({
      isOpen: true,
      status,
      message
    })
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
          <Button onClick={handleOpenModal}>Adicionar</Button>
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
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: 600
          }}
        >
          <Container>
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
              <Box
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8
                }}
              >
                <IconButton aria-label="close" title="Fechar" onClick={handleCloseModal}>
                  <Close />
                </IconButton>
              </Box>
              <Typography component="h3" variant="h5" mb={4}>Adicionar funcionário</Typography>
              <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Nome"
                    variant={TEXT_FIELD_VARIANT}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="occupation"
                    name="occupation"
                    label="Cargo"
                    variant={TEXT_FIELD_VARIANT}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.occupation}
                    error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                    helperText={formik.touched.occupation && formik.errors.occupation}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="document"
                    name="document"
                    label="CPF"
                    inputProps={{
                      maxLength: DOCUMENT_FIELD_MAX_LENGTH
                    }}
                    variant={TEXT_FIELD_VARIANT}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.document}
                    error={formik.touched.document && Boolean(formik.errors.document)}
                    helperText={formik.touched.document && formik.errors.document}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel error={formik.touched.status && Boolean(formik.errors.status)} id="status-label">Estado do benefício</InputLabel>
                    <Select
                      name="status"
                      labelId="status"
                      id="status"
                      label="Estado do benefício"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                    >
                      {
                        STATUS.map((status) => (
                          <MenuItem key={status} value={status}>{EmployeeStatusLabel[status as keyof typeof EmployeeStatusLabel]}</MenuItem>
                        ))
                      }
                    </Select>
                    {formik.touched.status && formik.errors.status && (
                      <FormHelperText error={formik.touched.status && Boolean(formik.errors.status)}>{formik.errors.status}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="E-mail"
                    variant={TEXT_FIELD_VARIANT}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid container item xs={12} sm={6} ml="auto" spacing={3}>
                  <Grid item xs={6}>
                    <Button onClick={handleCloseModal} fullWidth disabled={formik.isSubmitting || !formik.dirty}>Cancelar</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" fullWidth type="submit" disabled={formik.isSubmitting || !formik.dirty}>
                      { formik.isSubmitting ? <CircularProgress size={24} /> : 'Adicionar' }
                    </Button>
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
