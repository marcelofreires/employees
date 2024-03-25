import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { BaseScreenLayout } from '../layouts/BaseScreenLayout'
import type { Employee } from 'src/types'
import { employeeService } from 'src/services/employeeService'
import { EmployeeForm } from './components'
import { Loading } from 'src/components'

export function EmployeesDetailsScreen() {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams<{ id: Employee['id'] }>()

  async function handleGetEmployee(id: string) {


    try {
      setIsLoading(true)
      const response = await employeeService.getEmployee(id)

      setEmployee(response)
    } catch (error) {
      setEmployee(null)
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
          <Typography component="h2" variant="h4" mb={4}>{employee?.name}</Typography>
          <EmployeeForm employee={employee} />
        </>
      )}
    </BaseScreenLayout>
  )
}
