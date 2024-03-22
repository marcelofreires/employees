import { Container, Typography, Paper, Grid, styled, Box } from '@mui/material'

import { AppHeader } from './components';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  height: 300,
  width: '100%',
  display: 'block',
}));

function arr(numOfItems = 6) {
  return Array.from(Array(numOfItems))
}

function App() {
  return (
    <>
      <AppHeader />
      <Box
        component="main"
        py={{ xs: 4, sm: 8 }}
      >
        <Container>
          <Box>
            <Typography
              component="h2"
              variant="h4"
              mb={4}
            >
              Funcionários
            </Typography>
          </Box>
          <Box>
            <Grid
              container
              spacing={6}
            >
              {arr(20).map((_, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Item />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default App
