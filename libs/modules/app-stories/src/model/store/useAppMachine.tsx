import { useActor } from '@xstate/react'
import { useRootMachine } from '@codelab/frontend'

export const useAppMachine = () => {
  const rootMachine = useRootMachine()

  const [state, send] = useActor<any>(rootMachine.state.context.app)

  return { state, send }
}
