// @flow
import React, {
  useState,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
  useRef,
} from 'react'
import styled from 'styled-components'
import { State, useTransition } from './state-machine'
import type { Node } from 'react'

// ------------------------------------ //
// Styles
// ------------------------------------ //
const SC = {
  // Section
  section: styled.section`
    margin-bottom: 18em;
    text-align: center;
  `,
  section__title: styled.h3`
    font-size: 2rem;
    text-transform: lowercase;
  `,
  // Transition button
  transitionButton: styled.button`
    background-color: #000;
    padding: calc(0.5rem + 3px);
    margin: 0 0.5rem;
    text-transform: UPPERCASE;
    font-size: 0.8rem;
    font-weight: 700;
    border: 3px solid #000000;
    color: #fff;
    outline: 0;

    &:hover {
      background-color: #ffffff;
      border: 3px solid #000000;
      color: #000000;
    }
  `,
  // Input field
  textInput: styled.input`
    width: 250px;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 0;
    border-bottom: 3px solid #000;
    text-align: center;
    outline: 0;
  `,
  // List
  list: styled.ul`
    text-align: left;
  `,
}

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

// Making the input focus once the Component is rendered.
function useInputFocus() {
  // Set maybe type for current because React will not assign the instance of the element or Component
  // until the invocation of render method. React also assign null value to the ref after unmounting.
  const inputEl: { current: ?HTMLInputElement } = useRef(null)
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }, [])
  return inputEl
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
  children: Node,
}) {
  return (
    <SC.section>
      <SC.section__title>{title}</SC.section__title>
      <p>{description}</p>
      {children}
    </SC.section>
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
      <SC.transitionButton onClick={onNext}>Get started</SC.transitionButton>
    </Section>
  )
}

function Username({
  navigation: { onBack, onNext },
  detailsDispatch,
  initValue,
}: FieldProps) {
  const inputEl = useInputFocus()
  const { value, onChange } = useInputProps(initValue)
  const handleNextButton = useCallback(() => {
    // state machine transition
    onNext()
    // dispatch an action
    detailsDispatch({ type: 'username', payload: value })
  }, [value])
  return (
    <Section title="Username" description="pick your identifier">
      {/* $FlowFixMe */}
      <SC.textInput
        ref={inputEl}
        name="username"
        onChange={onChange}
        value={value}
      />
      <div>
        <SC.transitionButton onClick={onBack}>Back</SC.transitionButton>
        <SC.transitionButton onClick={handleNextButton}>
          Next
        </SC.transitionButton>
      </div>
    </Section>
  )
}

function Password({
  navigation: { onBack, onNext },
  detailsDispatch,
  initValue,
}: FieldProps) {
  const inputEl = useInputFocus()
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
      {/* $FlowFixMe */}
      <SC.textInput
        ref={inputEl}
        type="password"
        name="password"
        onChange={onChange}
        value={value}
      />
      <div>
        <SC.transitionButton onClick={onBack}>Back</SC.transitionButton>
        <SC.transitionButton onClick={handleNextButton}>
          Next
        </SC.transitionButton>
      </div>
    </Section>
  )
}

function Email({
  navigation: { onBack, onNext },
  detailsDispatch,
  initValue,
}: FieldProps) {
  const inputEl = useInputFocus()
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
      description="how can we reach you via messaging technology?"
    >
      {/* $FlowFixMe */}
      <SC.textInput
        ref={inputEl}
        type="email"
        name="email"
        onChange={onChange}
        value={value}
      />
      <div>
        <SC.transitionButton onClick={onBack}>Back</SC.transitionButton>
        <SC.transitionButton onClick={handleNextButton}>
          Next
        </SC.transitionButton>
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
      <SC.list>
        <li>username: {details.username}</li>
        <li>email: {details.email}</li>
      </SC.list>
      <p>does this look correct?</p>
      <div>
        <SC.transitionButton onClick={onBack}>Nah; No!</SC.transitionButton>
        <SC.transitionButton onClick={onNext}>Yes</SC.transitionButton>
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
      <SC.transitionButton onClick={handleNextButton}>
        Start over
      </SC.transitionButton>
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
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default UserRegistration
