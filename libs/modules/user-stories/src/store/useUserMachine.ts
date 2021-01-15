import { useActor } from '@xstate/react'
import { useRootMachine } from '@codelab/frontend'

export const useUserMachine = () => {
  const rootMachine = useRootMachine()

  const [state, send] = useActor<any>(rootMachine.state.context.user)

  const isAuthenticated = !!state.value?.authenticated

  return { state, send, isAuthenticated }
}
