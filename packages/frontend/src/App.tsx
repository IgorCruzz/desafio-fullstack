import React from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import usePersistedState from './presentation/utils/usePersistedState'

import SwitchToggle from './presentation/components/SwitchToggle'
import light from './presentation/styles/themes/light'
import dark from './presentation/styles/themes/dark'
import GlobalStyle from './presentation/styles/global'

import AppProvider from './presentation/hooks'
import Routes from './main/routes'

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppProvider>
          <SwitchToggle toggleTheme={toggleTheme} />
          <Routes />
        </AppProvider>
        <GlobalStyle />
      </Router>
    </ThemeProvider>
  )
}
export default App