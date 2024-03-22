import { Typography, AppBar, Toolbar, Box } from '@mui/material'
import { Theme } from '@mui/material/styles'

function AppHeader() {
  return (
    <AppBar
      position="sticky"
      sx={(theme: Theme) => ({
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(8px)',
        boxShadow: 'none',
        borderBottomColor: theme.palette.divider,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid'
      })}
    >
      <Toolbar>
        <Box
          component="a"
          href='#'
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            color={(theme: Theme) => theme.palette.text.primary}
          >
            Gym
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
