// @flow
import React, { createContext, useReducer, useContext } from 'react'
import { ThemeProvider as RootThemeProvider } from 'styled-components'
import debug from 'debug'
import type { Node } from 'react'

// Decorated debug tool
const log = debug('themeReducer:dispatch')

// TODO: Add generic type instead of using Object for better flow check.
function createThemesReducer(themes: Object) {
  return function themesReducer(state: Object, type: string) {
    // getting the theme based in the given action type (theme type).
    const foundTheme = themes[type]
    // If foundTheme is defined, then return it. Else, return state.
    return foundTheme ? foundTheme : state
  }
}

type ThemeDispatch = (action: string) => void

// Creating an abstraction layer for adding app theming. It is exposing an API Theme Provider and Context (Switch Dispatch Context).
function initThemes(themes: Object) {
  const themesReducer = createThemesReducer(themes)
  const SwitchThemeContext = createContext<ThemeDispatch>((type: string) =>
    log(`Dispatching action type: ${type}`),
  )

  function ThemeProvider({
    value,
    children,
  }: {
    value: string,
    children: Node,
  }) {
    const [theme, dispatch] = useReducer(themesReducer, themes[value])
    return (
      <RootThemeProvider theme={theme}>
        <SwitchThemeContext.Provider value={dispatch}>
          {children}
        </SwitchThemeContext.Provider>
      </RootThemeProvider>
    )
  }

  // Hook for getting the switch theme dispatch
  function useSwitchTheme() {
    return useContext(SwitchThemeContext)
  }

  return {
    ThemeProvider,
    useSwitchTheme,
  }
}

export default initThemes
