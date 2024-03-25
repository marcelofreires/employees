import { Box, Container } from '@mui/material';
import type { ContainerProps } from '@mui/material';

interface BaseScreenLayoutProps {
  children: React.ReactNode
  containerMaxWidth?: ContainerProps['maxWidth']
}

export function BaseScreenLayout({ children, containerMaxWidth }: BaseScreenLayoutProps) {
  return (
    <Box
      component="main"
      py={{
        xs: 4,
        sm: 8
      }}
    >
      <Container maxWidth={containerMaxWidth} component="section">
        {children}
      </Container>
    </Box>
  )
}
