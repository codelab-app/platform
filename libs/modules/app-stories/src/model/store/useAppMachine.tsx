import { useActor } from '@xstate/react'
import { AnyEventObject } from 'xstate'
import { useRootMachine } from '@codelab/frontend'

export const useAppMachine = () => {
  const rootMachine = useRootMachine()

  const [state, send] = useActor<any, AnyEventObject>(
    rootMachine.state.context.app,
  )

  return { state, send }
}
