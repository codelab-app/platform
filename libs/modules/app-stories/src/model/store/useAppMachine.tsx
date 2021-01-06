import { useActor } from '@xstate/react'
import { useRootMachine } from '@codelab/frontend'

export const useApp = () => {
  const rootMachine = useRootMachine()

  const [state, send] = useActor<any>(rootMachine.state.context.app)

  return { state, send }
}
