import type { TextFieldVariants, Theme } from '@mui/material'
import * as yup from 'yup'

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

export const EMPLOYEE_STATUS = ['active', 'inactive', 'pending', 'overdue']

export const REGEX_TO_ONLY_NUMBERS = /^\d+$/

export const DOCUMENT_FIELD_MAX_LENGTH = 11

export const validationSchema = yup.object({
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
