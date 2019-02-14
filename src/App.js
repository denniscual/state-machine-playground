// @flow
import React, { Component } from 'react'
import { Machine } from 'xstate'
import StateMachineProvider from './state-machine'
import UserRegistration from './UserRegistration'

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
      <UserRegistration />
    </StateMachineProvider>
  )
}

export default App
