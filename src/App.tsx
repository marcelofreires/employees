import { Box, Theme, darken } from '@mui/material'
import { BrowserRouter } from 'react-router-dom';

import { AppHeader } from './components'
import AppRoutes from './routes';
import { SnackbarAlertProvider } from './contexts/SnackbarAlert';

const BACKGROUND_DARKEN_COEFFICIENT = 0.0175

function App() {
  return (
    <Box
      sx={{
        bgcolor: (theme: Theme) => darken(theme.palette.background.default, BACKGROUND_DARKEN_COEFFICIENT),
        minHeight: '100vh'
      }}
    >
      <SnackbarAlertProvider>
        <BrowserRouter>
          <AppHeader />
          <AppRoutes />
        </BrowserRouter>
      </SnackbarAlertProvider>
    </Box>
  )
}

export default App
