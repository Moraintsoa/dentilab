import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'
import routes from './shared/routes/Route'
import { Css } from '@mui/icons-material'
import { CssBaseline } from '@mui/material'
import { AuthProvider } from './shared/context/AuthContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
