import { useMachine } from '@xstate/react'
import React, { PropsWithChildren } from 'react'
import { MachineContext, MachineContextProps } from './MachineContext'

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
