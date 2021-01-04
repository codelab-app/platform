import { useActor } from '@xstate/react'
import { useRootMachine } from '@codelab/frontend'

export const useLayout = () => {
  const appMachine = useRootMachine()

  const [state, send] = useActor<any>(appMachine.state.context.layout)

  return { state, send }
}
