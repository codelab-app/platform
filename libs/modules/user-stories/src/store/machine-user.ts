import { Machine } from 'xstate'
import { userLoginState } from '../useCases/userLogin'
import { userSignupState } from '../useCases/userSignup'
import { mergeState } from '@codelab/frontend'

export const createUserMachine = () => {
  const guestStates = mergeState(userSignupState, userLoginState, ['idle'])

  return Machine({
    id: 'user',
    initial: 'guest',
    states: {
      guest: {
        initial: 'idle',
        states: { ...guestStates },
      },
      // authenticated: {
      //   // initial: 'idle',
      //   // states: {
      //   // },
      // },
    },
  })
}
