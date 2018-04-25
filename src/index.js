import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#75a7ff',
      main: '#2979ff',
      dark: '#004ecb',
      contrastText: '#fff'
    },
    third: {
      light: '#ff6090',
      main: '#e91e63',
      dark: '#b0003a',
      contrastText: '#000'
    }
  }
})

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
