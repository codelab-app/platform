import { useRootMachine } from '@codelab/frontend'

export const useApp = () => {
  const { state, send } = useRootMachine()

  return { state, send }
}
