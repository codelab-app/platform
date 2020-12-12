import { useActor } from '@xstate/react'
import { useRootMachine } from '@codelab/frontend'

export const useUser = () => {
  const appMachine = useRootMachine()

  const [state, send] = useActor<any>(appMachine.state.context.user)

  return { state, send }
}
