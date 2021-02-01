import { Machine, assign } from 'xstate'

export const rootMachine = Machine<any>({
  id: 'core',
  entry: assign({}),
  initial: 'idle',
  states: {
    idle: {},
  },
})
