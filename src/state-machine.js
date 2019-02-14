// @flow
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react'
import { interpret } from 'xstate/lib/interpreter'
import { isNil } from 'ramda'
import debug from 'debug'
import type { Element, ChildrenArray } from 'react'

// Decorated debug tool
const log = debug('stateMachine:transition')

type Machine = {
  initialState: string,
  value: string,
  matches: string => boolean,
}

type Transition = string => void

// A hook which create a state machine with xstate.
function useMachine(machine: Machine) {
  // Keep track of the current machine state
  const [current, setCurrent] = useState(machine)

  // Start the service (only once!)
  const service = useMemo(
    () =>
      interpret(machine)
        .onTransition(state => {
          // Update the current machine state when a transition occurs
          setCurrent(state)
        })
        .start(),
    [],
  )

  // Stop the service when the component unmounts
  useEffect(() => {
    return () => service.stop()
  }, [])

  return [current, service.send]
}

const StateMachine = createContext<Machine>({})
const StateMachineTransition = createContext<Transition>(state =>
  log(`state: ${state}`),
)

// Providing the state machine value Provider and state machine transition Provider.
function StateMachineProvider({
  value,
  children,
}: {
  value: Machine,
  children: Element<any>,
}) {
  const [current, send] = useMachine(value)
  return (
    <StateMachine.Provider value={current}>
      <StateMachineTransition.Provider value={send}>
        {children}
      </StateMachineTransition.Provider>
    </StateMachine.Provider>
  )
}

// The component to define which parts of the tree should be rendered for a given state (or set of states).
function State({
  is,
  cond,
  children,
}: {
  is: string, // TODO: is prop should accept string or array type. Check react-automata State component for ref - https://github.com/MicheleBertoli/react-automata.
  cond: boolean,
  children: ChildrenArray<any>,
}) {
  const current = useContext(StateMachine)
  if (current.matches(is)) {
    // Check if the cond is defined. Cond is an extended state logic.
    if (!isNil(cond)) {
      // If cond returns true, then we gonna return elements. Else, return null.
      return cond ? children : null
    }
    return children
  }
  // Else, return null.
  return null
}

State.defaultProps = {
  cond: true,
}

// Returning the state machine current value (from xstate).
function useStateMachine() {
  return useContext(StateMachine)
}

// Returning the state machine transition.
function useTransition() {
  return useContext(StateMachineTransition)
}

export {
  StateMachineProvider as default,
  State,
  useStateMachine,
  useTransition,
}
