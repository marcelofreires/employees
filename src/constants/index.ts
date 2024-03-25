import type { TextFieldVariants, Theme } from '@mui/material'

export const employeeStatusColor = {
  active: (theme: Theme) => theme.palette.success.light,
  inactive: (theme: Theme) => theme.palette.grey[500],
  overdue: (theme: Theme) => theme.palette.error.light,
  pending: (theme: Theme) => theme.palette.warning.light,
}

export enum EmployeeStatusLabel {
  active = 'Ativo',
  inactive = 'Inativo',
  overdue = 'Atrasado',
  pending = 'Pendente',
}

export const TEXT_FIELD_VARIANT: TextFieldVariants = 'outlined'
