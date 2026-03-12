import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    /* ================================
       COULEURS PRINCIPALES
    ================================= */

    primary: {
      main: '#D96846',       // Couleur principale (boutons principaux, actions importantes)
      contrastText: '#FFFFFF'
    },

    secondary: {
      main: '#596235',       // Couleur secondaire (actions secondaires, filtres)
      contrastText: '#FFFFFF'
    },

    tertiary: {
      main: '#2F3020',       // Couleur sombre pour header, sidebar, footer
      contrastText: '#FFFFFF'
    },

    /* ================================
       BACKGROUND
    ================================= */

    background: {
      // default: '#DED0B3',    // Fond général de l'application
      default: '#CDCBD6',    // Fond général de l'application
      paper: '#FFFFFF'       // Fond des Card, Dialog, Paper
    },

    /* ================================
       TEXTE
    ================================= */

    text: {
      primary: '#333333',    // Texte principal
      secondary: '#666666',  // Texte secondaire
      tertiary: '#FFFFFF',   // Texte sur fonds sombres (ex: sidebar)
    },

    /* ================================
       AUTRES COULEURS UI
    ================================= */

    divider: '#E0E0E0',

    action: {
      hover: 'rgba(0,0,0,0.04)',
      selected: 'rgba(0,0,0,0.08)',
      disabled: 'rgba(0,0,0,0.26)'
    }

  },

  /* ================================
     TYPOGRAPHIE
  ================================= */

  typography: {

    fontFamily: 'Roboto, Arial, sans-serif',

    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2F3020'
    },

    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#2F3020'
    },

    h3: {
      fontSize: '1.5rem',
      fontWeight: 600
    },

    h4: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600
    },

    body1: {
      fontSize: '1rem',
      color: '#333333'
    },

    body2: {
      fontSize: '0.875rem',
      color: '#666666'
    },
    body3: {
      fontSize: '0.75rem',
      color: '#999999'
    }

  },

});
export default theme;