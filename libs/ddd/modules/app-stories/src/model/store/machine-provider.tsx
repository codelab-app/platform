import { useMachine } from '@xstate/react'
import React, { PropsWithChildren, useContext } from 'react'

type MachineContextProps = {
  rootMachine: any
}

export const MachineContext = React.createContext<MachineContextProps>({
  rootMachine: null,
})

export const useAppMachine = () => {
  const { rootMachine } = useContext(MachineContext)
  const [state, send] = rootMachine

  return { state, send }
}

export const MachineProvider = (
  props: PropsWithChildren<MachineContextProps>,
) => {
  const { rootMachine, children } = props

  if (!rootMachine) {
    throw new Error('Please provide a root machine')
  }

  const machine = useMachine(rootMachine)

  return (
    <MachineContext.Provider value={{ rootMachine: machine }}>
      {children}
    </MachineContext.Provider>
  )
}
