import { useActor } from '@xstate/react'
import { useAppMachine } from '@codelab/ddd/modules/app-stories'

export const useLayout = () => {
  const appMachine = useAppMachine()

  const [state, send] = useActor(appMachine.state.context.layout)

  return { state, send }
}
