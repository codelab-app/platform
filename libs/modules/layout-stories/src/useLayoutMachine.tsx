import { useActor } from '@xstate/react'
import { useRootMachine } from '@codelab/frontend'

export const useLayoutMachine = () => {
  const rootMachine = useRootMachine()

  const [state, send] = useActor<any>(rootMachine.state.context.layout)

  return { state, send }
}
