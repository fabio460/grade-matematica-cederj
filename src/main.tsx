import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router';
import { router } from './Componentes/routes.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
  </StrictMode>,
)
