import { Box, Container } from '@mui/material';

export function BaseScreenLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="main"
      py={{
        xs: 4,
        sm: 8
      }}
    >
      <Container component="section">
        {children}
      </Container>
    </Box>
  )
}
