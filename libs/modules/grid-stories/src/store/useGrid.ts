import { useActor } from '@xstate/react'
import { useRootMachine } from '@codelab/frontend'

export const useGrid = () => {
  const appMachine = useRootMachine()

  const [state, send] = useActor<any>(appMachine.state.context.grid)

  return { state, send }
}
