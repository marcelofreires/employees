import { Box, Button, Grid, TextField } from '@mui/material';
import type { TextFieldVariants, Theme } from '@mui/material';
import { Link } from 'react-router-dom'
import type { Employee } from 'src/types';

const TEXT_FIELD_VARIANT: TextFieldVariants = 'outlined'

interface EmployeeFormProps {
  employee: Employee
}

export function EmployeeForm({ employee }: EmployeeFormProps) {
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="name-field"
            label="Nome"
            variant={TEXT_FIELD_VARIANT}
            defaultValue={employee?.name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="occupation-field"
            label="Cargo"
            variant={TEXT_FIELD_VARIANT}
            defaultValue={employee?.occupation}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email-field"
            label="E-mail"
            variant={TEXT_FIELD_VARIANT}
            defaultValue={employee?.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="document-field"
            label="CPF"
            variant={TEXT_FIELD_VARIANT}
            defaultValue={employee?.document}
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} sm={6} ml="auto" spacing={3}>
          <Grid item xs={6}>
            <Link to="/">
              <Button fullWidth>Cancelar</Button>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>Salvar</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
