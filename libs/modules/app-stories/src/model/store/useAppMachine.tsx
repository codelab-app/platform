import { useActor } from '@xstate/react'
import { Sender, State } from 'xstate'
import { useRootMachine } from '@codelab/frontend'

export const useAppMachine: () => {
  state: State<any, any>
  send: Sender<any>
} = () => {
  const rootMachine = useRootMachine()

  const [state, send] = useActor<any>(rootMachine.state.context.app)

  return { state, send }
}
