import { Typography, AppBar, Toolbar, Box, alpha, Theme } from '@mui/material'

export function AppHeader() {
  return (
    <AppBar
      position="sticky"
      sx={(theme: Theme) => ({
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(6px)',
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
