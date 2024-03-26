import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import type { Theme } from '@mui/material'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'

import { DOCUMENT_FIELD_MAX_LENGTH, EMPLOYEE_STATUS, EmployeeStatusLabel, TEXT_FIELD_VARIANT, validationSchema } from 'src/constants'
import type { Employee } from 'src/types'
import { employeeService } from 'src/services/employeeService'

interface EditEmployeeFormProps {
  employee: Employee
}

export function EditEmployeeForm({ employee }: EditEmployeeFormProps) {
  const formik = useFormik({
    initialValues: {
      id: employee.id,
      name: employee.name,
      occupation: employee.occupation,
      email: employee.email,
      document: employee.document,
      status: employee.status,
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await employeeService.updateEmployee({
          employeeId: employee.id,
          employeeData: values
        })
        actions.resetForm({ values: response.data })

        // TODO: Exibir mensagem sucesso para o usuário
      } catch (error) {
        // TODO: Exibir mensagem erro para o usuário
        console.error('DEU ERRO', error)
      } finally {
        actions.setSubmitting(false)
      }
    },
  })

  return (
    <Box
      sx={(theme: Theme) => ({
        bgcolor: theme.palette.background.default,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        p: 4,
      })}
    >
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
            disabled
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
                EMPLOYEE_STATUS.map((status) => (
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
            <Link to="/">
              <Button fullWidth disabled={formik.isSubmitting}>Cancelar</Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth type="submit" disabled={formik.isSubmitting || !formik.dirty}>
              { formik.isSubmitting ? <CircularProgress size={24} /> : 'Editar' }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
