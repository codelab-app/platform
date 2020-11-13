import { useMachine } from '@xstate/react'
import React, { PropsWithChildren } from 'react'
import { EventObject, Typestate } from 'xstate'
import { MachineProps } from '@codelab/shared/interface/component'
import {
  ContextApp,
  EventApp,
  StateApp,
  StateSchemaApp,
} from '@codelab/state/app'

interface MachineContextProps<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext>
> {
  actors: {
    app: any
    layout: any
    vertex: any
    graph: any
    modal: any
    node: any
    graphQLDemo: any
  }
}

export const MachineContext = React.createContext<
  MachineContextProps<ContextApp, EventApp, StateApp>
>({
  actors: {
    app: undefined,
    layout: undefined,
    vertex: undefined,
    graph: undefined,
    modal: undefined,
    node: undefined,
    graphQLDemo: undefined,
  },
})

export const MachineProvider = (
  props: PropsWithChildren<MachineProps<ContextApp, StateSchemaApp, EventApp>>,
) => {
  const { machine, children } = props

  const [state, send, service] = useMachine(machine)

  const value = {
    actors: {
      app: service,
      layout: state.context?.layout,
      vertex: state.context?.vertex,
      graph: state.context?.graph,
      modal: state.context?.modal,
      node: state.context?.node,
      graphQLDemo: state.context?.graphQLDemo,
    },
  }

  return (
    <MachineContext.Provider value={value}>{children}</MachineContext.Provider>
  )
}
