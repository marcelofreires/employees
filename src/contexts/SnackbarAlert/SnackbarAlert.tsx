import { createContext, useState} from 'react'
import type { ReactNode } from 'react'
import type { AlertColor } from '@mui/material'

import { SnackbarAlert } from 'src/components'

interface SnackbarAlertContext {
  handleOpenSnackbar: ({status, message}: Omit<SnackbarStateProps, 'isOpen'>) => void
}

type SnackbarStateProps = {
  isOpen: boolean
  status: AlertColor
  message: string
}

export const SnackbarAlertContext = createContext({
  handleOpenSnackbar: ({status, message}: Omit<SnackbarStateProps, 'isOpen'>) => ({status, message})
})

interface SnackbarAlertProviderProps {
  children: ReactNode
}

export function SnackbarAlertProvider({ children }: SnackbarAlertProviderProps) {
  const [openSnackbar, setOpenSnackbar] = useState<SnackbarStateProps>({ isOpen: false, status: 'info', message: '' })

  function handleOpenSnackbar({status, message}: Omit<SnackbarStateProps, 'isOpen'>) {
    setOpenSnackbar({
      isOpen: true,
      status,
      message
    })

    return {status, message}
  }

  function handleCloseSnackbar() {
    setOpenSnackbar((prevState) => ({...prevState, isOpen: false}))
  }

  return (
    <SnackbarAlertContext.Provider value={{handleOpenSnackbar}}>
      {children}
      <SnackbarAlert
        isOpen={openSnackbar.isOpen}
        onClose={handleCloseSnackbar}
        type={openSnackbar.status}
        message={openSnackbar.message}
      />
    </SnackbarAlertContext.Provider>
  )
}
