import { Backdrop, CircularProgress } from '@mui/material'
import type { Theme } from '@mui/material'

interface LoadingProps {
  isLoading: boolean
}

export function Loading({ isLoading }: LoadingProps) {
  return (
    <Backdrop
      sx={{ color: (theme: Theme) => theme.palette.common.white, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
