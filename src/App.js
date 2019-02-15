// @flow
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Machine } from 'xstate'
import StateMachineProvider from './state-machine'
import UserRegistration from './UserRegistration'
import { ThemeProvider } from './app-theme'
import normalizeCss from './normalize'

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
      <ThemeProvider value="LIGHT">
        <SC.appWrapper>
          <GlobalStyle />
          <UserRegistration />
        </SC.appWrapper>
      </ThemeProvider>
      >
    </StateMachineProvider>
  )
}

export default App
