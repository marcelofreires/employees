import { Typography, Grid, Box, Avatar, Button, Theme } from '@mui/material'

import type { Employee } from 'src/types'
import { EmployeeStatusLabel, employeeStatusColor } from 'src/constants'
import { handleFirstLetter } from 'src/utils'
import { Link } from 'react-router-dom'

const AVATAR_SIZE = 56

interface EmployeeCardProps {
  employee: Employee
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <Box
      component="section"
      sx={(theme: Theme) => ({
        bgcolor: theme.palette.background.default,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 3,
        p: 4,
        height: '100%'
      })}
    >
      <Grid
        container
        flexDirection="column"
        height="100%"
      >
        <Grid
          container
          flexDirection="column"
          alignItems="center"
          mb="auto"
        >
          <Avatar
            sx={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              mb: 2,
            }}
          >
            {handleFirstLetter(employee.name)}
          </Avatar>
          <Typography
            component="h3"
            sx={{
              fontWeight: (theme: Theme) => theme.typography.fontWeightMedium,
              fontSize: (theme: Theme) => theme.typography.h6.fontSize,
            }}
          >
              {employee.name}
          </Typography>
          <Typography>{employee.occupation}</Typography>
          <Typography
            sx={{
              fontSize: (theme: Theme) => theme.typography.subtitle2.fontSize,
            }}
          >
            {employee.email}
          </Typography>
          <Box my={2}>
            <Grid container alignItems="center" justifyItems="center">
              <Box
                sx={{
                  bgcolor: employeeStatusColor[employee.status],
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  mr: 0.5
                }}
              />
              <Typography>{EmployeeStatusLabel[employee.status]}</Typography>
            </Grid>
          </Box>
        </Grid>
        <Link to={`/employees/${employee.id}`}>
          <Button variant="contained" component="span" fullWidth>Ver mais detalhes</Button>
        </Link>
      </Grid>
    </Box>
  )
}
