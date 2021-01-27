import { useActor } from '@xstate/react'
import { AnyEventObject } from 'xstate'
import { useRootMachine } from '@codelab/frontend'

export const useUserMachine = () => {
  const rootMachine = useRootMachine()

  const [state, send] = useActor<any, AnyEventObject>(
    rootMachine.state.context.user,
  )

  const isAuthenticated =
    !!state.value?.authenticated && !state.value?.initialCheck

  return { state, send, isAuthenticated }
}
