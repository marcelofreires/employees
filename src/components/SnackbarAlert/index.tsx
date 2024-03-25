import { Alert, Snackbar } from '@mui/material'
import type { AlertColor } from '@mui/material'

interface SnackbarAlertProps {
  isOpen?: boolean
  onClose?: () => void
  type?: AlertColor
  message?: string
}

const TIME_TO_HIDE_IN_MS = 3000

export function SnackbarAlert({
  isOpen,
  onClose,
  message,
  type,
}: SnackbarAlertProps) {
  return (
    <Snackbar open={isOpen} autoHideDuration={TIME_TO_HIDE_IN_MS} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
