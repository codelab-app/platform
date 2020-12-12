import { useContext } from 'react'
import { MachineContext } from './MachineContext'

export const useRootMachine = () => {
  const { rootMachine } = useContext(MachineContext)
  const [state, send] = rootMachine

  return { state, send }
}
