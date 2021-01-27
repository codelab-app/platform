import { useActor } from '@xstate/react'
import { AnyEventObject } from 'xstate'
import { useRootMachine } from '@codelab/frontend'

export const useLayoutMachine = () => {
  const rootMachine = useRootMachine()

  const [state, send] = useActor<any, AnyEventObject>(
    rootMachine.state.context.layout,
  )

  return { state, send }
}
