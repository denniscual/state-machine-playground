// @flow
import React from 'react'
import { Machine } from 'xstate'
import { createGlobalStyle } from 'styled-components'
import StateMachineProvider from './state-machine'
import UserRegistration from './UserRegistration'
import normalizeCss from './normalize'

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
`

function App() {
  return (
    <StateMachineProvider value={machine}>
      <React.Fragment>
        <GlobalStyle />
        <UserRegistration />
      </React.Fragment>
    </StateMachineProvider>
  )
}

export default App
