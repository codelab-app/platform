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
  // app: {
  //   state?: State<TContext, TEvent, any, TTypestate>
  //   send?: Interpreter<TContext, any, TEvent, TTypestate>['send']
  //   service?: Interpreter<TContext, any, TEvent, TTypestate>
  // }
  actors: {
    // app: any
    layout: any
    modal: any
    node: any
    graphQLDemo: any
  }
}

export const MachineContext = React.createContext<
  MachineContextProps<ContextApp, EventApp, StateApp>
>({
  // app: {
  //   state: undefined,
  //   send: undefined,
  //   service: undefined,
  // },
  actors: {
    // app: undefined,
    layout: undefined,
    modal: undefined,
    node: undefined,
    graphQLDemo: undefined,
  },
})

export const MachineProvider = (
  props: PropsWithChildren<MachineProps<ContextApp, StateSchemaApp, EventApp>>,
) => {
  const { machine, children } = props

  const [state] = useMachine(machine)

  const value = {
    actors: {
      // app: state.context?.app,
      layout: state.context?.layout,
      modal: state.context?.modal,
      node: state.context?.node,
      graphQLDemo: state.context?.graphQLDemo,
    },
  }

  return (
    <MachineContext.Provider value={value}>{children}</MachineContext.Provider>
  )
}
