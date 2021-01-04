import { assign } from 'xstate'
import { StateNodeConfig } from 'xstate/lib/types'

export const userSignOutState: StateNodeConfig<any, any, any> = {
  invoke: {
    src: 'executeSignOut',
    onDone: {
      target: '#guest',
      actions: assign({
        userData: undefined,
      }),
    },
  },
}
