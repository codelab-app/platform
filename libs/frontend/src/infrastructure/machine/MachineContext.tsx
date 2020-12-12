import React from 'react'

export type MachineContextProps = {
  rootMachine: any
}
export const MachineContext = React.createContext<MachineContextProps>({
  rootMachine: null,
})
