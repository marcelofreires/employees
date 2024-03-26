import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { BaseScreenLayout } from '../layouts/BaseScreenLayout'
import type { Employee, EmployeeFormValues } from 'src/types'
import { employeeService } from 'src/services/employeeService'
import { EditEmployeeForm } from './components'
import { Loading } from 'src/components'

export interface EmployeeProps extends EmployeeFormValues {
  id: string
}

export function EmployeesDetailsScreen() {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams<{ id: Employee['id'] }>()

  async function handleGetEmployee(id: string) {
    try {
      setIsLoading(true)
      const response = await employeeService.getEmployee(id)

      setEmployee(response)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(id) {
      handleGetEmployee(id)
    }
  }, [id])

  return (
    <BaseScreenLayout containerMaxWidth="sm">
      <Box mb={4}>
        <Link to="/">
          <Button startIcon={<ArrowBackIcon />} component="span">Voltar</Button>
        </Link>
      </Box>
      { isLoading && <Loading isLoading={isLoading} /> }
      {employee && (
        <>
          <Typography component="h2" variant="h4" mb={4}>Editar</Typography>
          <EditEmployeeForm employee={employee} />
        </>
      )}
    </BaseScreenLayout>
  )
}
