// @flow
import React, { createContext, useReducer } from 'react'
import { ThemeProvider as RootThemeProvider } from 'styled-components'
import debug from 'debug'
import type { Node } from 'react'

// Decorated debug tool
const log = debug('themeReducer:dispatch')

type ThemeAction = {
  type: string,
}

// TODO: Add generic type instead of using Object for better flow check.
function createThemesReducer(themes: Object) {
  return function themesReducer(state: Object, action: ThemeAction) {
    const { type } = action
    // getting the theme based in the given action type (theme type).
    const foundTheme = themes[type]
    // If foundTheme is defined, then return it. Else, return state.
    return foundTheme ? foundTheme : state
  }
}

type ThemeDispatch = (action: ThemeAction) => void

// Creating an abstraction layer for adding app theming. It is exposing an API Theme Provider and Context (Switch Dispatch Context).
function initThemes(themes: Object) {
  const themesReducer = createThemesReducer(themes)
  const SwitchThemeContext = createContext<ThemeDispatch>(
    (action: ThemeAction) => log(`Dispatching action type: ${action.type}`),
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

  return {
    ThemeProvider,
    SwitchThemeContext,
  }
}

export default initThemes
