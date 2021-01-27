import { useActor } from '@xstate/react'
import { AnyEventObject } from 'xstate'
import { useRootMachine } from '@codelab/frontend'

export const useGrid = () => {
  const appMachine = useRootMachine()

  const [state, send] = useActor<any, AnyEventObject>(
    appMachine.state.context.grid,
  )

  return { state, send }
}
