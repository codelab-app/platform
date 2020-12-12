import { Machine } from 'xstate'
import { guestStates } from './machine-user--guest'

export const userMachine = Machine({
  id: 'user',
  initial: 'guest',
  states: {
    guest: {
      ...guestStates,
    },
    signedUp: {},
    loggedIn: {},
  },
})
