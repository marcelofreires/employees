import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { BaseScreenLayout } from '../layouts/BaseScreenLayout'

export function NoMatchScreen() {
  return (
    <BaseScreenLayout>
      <Stack alignItems="center">
        <Typography component="h2" variant="h4" mb={4}>Página não encontrada</Typography>
        <Typography component="h3" variant="subtitle1" mb={2}>O que acha de tentar voltar para a página inicial?</Typography>
        <Link to="/">
          <Button component="span">Voltar para o início</Button>
        </Link>
      </Stack>
    </BaseScreenLayout>
  )
}
