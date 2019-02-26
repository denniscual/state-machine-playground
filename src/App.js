// @flow
import React from 'react'
import styled from 'styled-components'
import { Machine } from 'xstate'
import StateMachineProvider from './state-machine'
import SwitchTheme from './SwitchTheme'
import UserRegistration from './UserRegistration'
import { ThemeProvider, GlobalStyle, themeVars } from './app-theme'

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
    background-color: var(${themeVars.backgroundColor});
    border: 3px solid var(${themeVars.borderColor});
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

function App() {
  return (
    <StateMachineProvider value={machine}>
      <ThemeProvider value="DARK">
        <GlobalStyle />
        <SC.appWrapper>
          <SwitchTheme />
          <UserRegistration />
        </SC.appWrapper>
      </ThemeProvider>
    </StateMachineProvider>
  )
}

export default App
