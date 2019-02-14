// @flow
import React, { useState, useCallback, useMemo, useReducer } from 'react'
import styled from 'styled-components'
import { State, useTransition } from './state-machine'
import type { ChildrenArray } from 'react'

// ------------------------------------ //
// Styles
// ------------------------------------ //
const SC = {}

// ------------------------------------ //
// Custom Hooks
// ------------------------------------ //
type NavigationHandlers = { onBack: () => void, onNext: () => void }
function useNavigationHandlers(): NavigationHandlers {
  const transition = useTransition()
  const handleGoingBack = useCallback(() => {
    transition('BACK')
  }, [])
  const handleGoingNext = useCallback(() => {
    transition('NEXT')
  }, [])
  return useMemo(
    () => ({
      onBack: handleGoingBack,
      onNext: handleGoingNext,
    }),
    [],
  )
}

type InputProps = {
  value: string,
  onChange: (SyntheticEvent<HTMLInputElement>) => void,
}

function useInputProps(init: string): InputProps {
  const [input, setInput] = useState(init)
  // Input onChange handler
  function handleChangeInput(event: SyntheticEvent<HTMLInputElement>): void {
    // To access your input instance use `event.currentTarget`.
    // eslint-disable-next-line no-unused-expressions
    ;(event.currentTarget: HTMLInputElement)
    setInput(event.currentTarget.value)
  }
  return useMemo(
    () => ({
      value: input, // value prop of an input
      onChange: handleChangeInput, // onChange prop of an input
    }),
    [input],
  )
}

// ------------------------------------ //
// Business Logic
// ------------------------------------ //
type Dispatch<A> = A => void
type RegistrationDetailsState = {
  username: string,
  password: string,
  email: string,
}
type RegistrationDetailsAction = {
  type: string,
  payload?: string,
}

const initDetailsState: RegistrationDetailsState = {
  username: '',
  password: '',
  email: '',
}

function reducerUserRegistrationDetails(
  state: RegistrationDetailsState,
  action: RegistrationDetailsAction,
): RegistrationDetailsState {
  const { type, payload } = action
  switch (type) {
    case 'username': {
      return {
        ...state,
        username: payload,
      }
    }
    case 'password': {
      return {
        ...state,
        password: payload,
      }
    }
    case 'email': {
      return {
        ...state,
        email: payload,
      }
    }
    case 'reset': {
      return initDetailsState
    }
    default: {
      return state
    }
  }
}

// ------------------------------------ //
// Components
// ------------------------------------ //
type FieldProps = {
  initValue: string,
  navigation: NavigationHandlers,
  detailsDispatch: Dispatch<RegistrationDetailsAction>,
}

function Section({
  title,
  description,
  children,
}: {
  title: string,
  description: string,
  children: ChildrenArray<any>,
}) {
  return (
    <section>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </section>
  )
}

Section.defaultProps = {
  description: '',
}

function GettingStarted({ onNext }: { onNext: () => void }) {
  return (
    <Section
      title="Getting started"
      description="give us your details and we'll make an account for ya"
    >
      <button onClick={onNext}>Getting started</button>
    </Section>
  )
}

function Username({
  navigation: { onBack, onNext },
  detailsDispatch,
  initValue,
}: FieldProps) {
  const { value, onChange } = useInputProps(initValue)
  const handleNextButton = useCallback(() => {
    // state machine transition
    onNext()
    // dispatch an action
    detailsDispatch({ type: 'username', payload: value })
  }, [value])
  return (
    <Section title="Username" description="pick your identifier">
      <div>
        <input name="username" onChange={onChange} value={value} />
        <button onClick={onBack}>Back</button>
        <button onClick={handleNextButton}>Next</button>
      </div>
    </Section>
  )
}

function Password({
  navigation: { onBack, onNext },
  detailsDispatch,
  initValue,
}: FieldProps) {
  const { value, onChange } = useInputProps(initValue)
  const handleNextButton = useCallback(
    (event: SyntheticEvent<HTMLButtonElement>) => {
      // state machine transition
      onNext()
      // dispatch an action
      detailsDispatch({ type: 'password', payload: value })
    },
    [value],
  )
  return (
    <Section title="Password" description="protect yourself! use a password">
      <div>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={value}
        />
        <button onClick={onBack}>Back</button>
        <button onClick={handleNextButton}>Next</button>
      </div>
    </Section>
  )
}

function Email({
  navigation: { onBack, onNext },
  detailsDispatch,
  initValue,
}: FieldProps) {
  const { value, onChange } = useInputProps(initValue)
  const handleNextButton = useCallback(
    (event: SyntheticEvent<HTMLButtonElement>) => {
      // state machine transition
      onNext()
      // dispatch an action
      detailsDispatch({ type: 'email', payload: value })
    },
    [value],
  )
  return (
    <Section
      title="Email"
      description="how can we reach you via antiquated asynchronous messaging technology?"
    >
      <div>
        <input type="email" name="email" onChange={onChange} value={value} />
        <button onClick={onBack}>Back</button>
        <button onClick={handleNextButton}>Next</button>
      </div>
    </Section>
  )
}

type SummaryProps = {
  navigation: NavigationHandlers,
  details: RegistrationDetailsState,
}
function Summary({ navigation: { onBack, onNext }, details }: SummaryProps) {
  return (
    <Section title="Summary" description="here's what you entered:">
      <div>
        <p>Username: {details.username}</p>
        <p>Email: {details.email}</p>
        <button onClick={onBack}>Back to username</button>
        <button onClick={onNext}>Next</button>
      </div>
    </Section>
  )
}

function End({
  onNext,
  detailsDispatch,
}: {
  onNext: () => void,
  detailsDispatch: Dispatch<RegistrationDetailsAction>,
}) {
  const handleNextButton = useCallback(
    (event: SyntheticEvent<HTMLButtonElement>) => {
      // state machine transition
      onNext()
      // dispatch an action
      detailsDispatch({ type: 'reset' })
    },
    [],
  )
  return (
    <Section title="Final" description="great experience huh!">
      <button onClick={handleNextButton}>Start over</button>
    </Section>
  )
}

// Summary component.
function UserRegistration() {
  const navigation = useNavigationHandlers()
  const [details, detailsDispatch] = useReducer(
    reducerUserRegistrationDetails,
    initDetailsState,
  )
  return (
    <div>
      <State is="init">
        <GettingStarted onNext={navigation.onNext} />
      </State>
      <State is="username">
        <Username
          initValue={details.username}
          navigation={navigation}
          detailsDispatch={detailsDispatch}
        />
      </State>
      <State is="password">
        <Password
          initValue={details.password}
          navigation={navigation}
          detailsDispatch={detailsDispatch}
        />
      </State>
      <State is="email">
        <Email
          initValue={details.email}
          navigation={navigation}
          detailsDispatch={detailsDispatch}
        />
      </State>
      <State is="summary">
        <Summary navigation={navigation} details={details} />
      </State>
      <State is="end" detailsDispatch={detailsDispatch}>
        <End onNext={navigation.onNext} detailsDispatch={detailsDispatch} />
      </State>
    </div>
  )
}

export default UserRegistration
