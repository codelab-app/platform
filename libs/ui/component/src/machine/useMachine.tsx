import { useContext } from 'react'
import { MachineContext } from './MachineProvider'

export const useActors = () => {
  const { app } = useContext(MachineContext)
}
