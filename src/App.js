// @flow
import React, { createContext, useReducer } from 'react'
import { Machine } from 'xstate'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import StateMachineProvider from './state-machine'
import UserRegistration from './UserRegistration'
import normalizeCss from './normalize'
import type { Node } from 'react'

// ------------------------------------ //
// Styles
// ------------------------------------ //
const SC = {
  appWrapper: styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border: 3px solid #000;
  `,
}

// ------------------------------------ //
// App state transition
// ------------------------------------ //
const statechart = {
  initial: 'init',
  states: {
    init: {
      on: {
        NEXT: 'username',
      },
    },
    username: {
      on: {
        BACK: 'init',
        NEXT: 'password',
      },
    },
    password: {
      on: {
        BACK: 'username',
        NEXT: 'email',
      },
    },
    email: {
      on: {
        BACK: 'password',
        NEXT: 'summary',
      },
    },
    summary: {
      on: {
        BACK: 'username',
        NEXT: 'end',
      },
    },
    end: {
      on: {
        NEXT: 'init',
      },
    },
  },
}

const machine = Machine(statechart)

// ------------------------------------ //
// Theming
// ------------------------------------ //

const themeVars = {
  mainBackgroundColor: '--main-bg-color',
  mainTextColor: '--main-text-color',
  mainButtonColor: '--main-button-color',
}

const lightTheme = {
  [themeVars.mainBackgroundColor]: '#ffffff',
  [themeVars.mainTextColor]: '#000000',
  [themeVars.mainButtonColor]: '#ffffff',
}
const darkTheme = {
  [themeVars.mainBackgroundColor]: '#000000',
  [themeVars.mainTextColor]: '#ffffff',
  [themeVars.mainButtonColor]: '#000000',
}

const themes = {
  LIGHT: lightTheme,
  DARK: darkTheme,
}

// TODO: Add generic type instead of using Object for better flow check.
function createThemesReducer(themes: Object, init: string) {
  return function themesReducer(state: Object, action: { type: string }) {
    const { type } = action
    const initTheme = themes[init]
    // getting the theme based in the given action type (theme type).
    const foundTheme = themes[type]
    // If foundTheme is undefined, return initTheme.
    return foundTheme ? foundTheme : initTheme
  }
}

// TODO: We need to create an abstraction layer for app theming. It should expose an API Theme Provider and Context (Switch Dispatch Context).
// Provider is used
const themesReducer = createThemesReducer(themes, 'LIGHT')
const SwitchThemeContext = createContext()

function AppThemeProvider({
  initTheme,
  children,
}: {
  initTheme: string,
  children: Node,
}) {
  const [theme, dispatch] = useReducer(themesReducer, initTheme)
  return (
    // TODO: We need to use the ThemeProvider component of SC.
    <SwitchThemeContext.Provider value={dispatch}>
      {children}
    </SwitchThemeContext.Provider>
  )
}

// ------------------------------------ //
// Global styles
// ------------------------------------ //
const GlobalStyle = createGlobalStyle`
  /* Include the normalize css */
  ${normalizeCss}
  * {
    letter-spacing: 0.1em;
  }
  body {
    height: 98vh;
    width: 100vw;
    font-family: sans-serif
  }
  /* Styling the root element */
  #root {
    height: 100%;
  }
`

function App() {
  return (
    <StateMachineProvider value={machine}>
      <SC.appWrapper>
        <GlobalStyle />
        <UserRegistration />
      </SC.appWrapper>
    </StateMachineProvider>
  )
}

export default App
