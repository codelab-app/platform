import React from 'react'
import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

interface ToggleContext {
  count: number
}

const toggleMachine = Machine<ToggleContext>({
  id: 'toggle',
  initial: 'inactive',
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: 'inactive' },
    },
  },
})

const XState = () => {
  const [current, send] = useMachine(toggleMachine)
  const active = current.matches('active')
  const { count } = current.context

  return (
    <div className="App">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button type="button" onClick={() => send('TOGGLE')}>
        Click me ({active ? '✅' : '❌'})
      </button>
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  )
}

export default XState
