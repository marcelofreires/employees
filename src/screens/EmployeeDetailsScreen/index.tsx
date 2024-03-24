import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { BaseScreenLayout } from '../layouts/BaseScreenLayout';
import { Employee } from 'src/types';

export function EmployeesDetailsScreen() {
  const { id } = useParams<{ id: Employee['id'] }>()

  return (
    <BaseScreenLayout>
      <Typography
        component="h2"
        variant="h4"
        mb={4}
      >
        Funcionário {id}
      </Typography>
    </BaseScreenLayout>
  )
}
