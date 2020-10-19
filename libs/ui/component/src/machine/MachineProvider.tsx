import { useMachine } from '@xstate/react'
import React, { PropsWithChildren } from 'react'
import { EventObject, Interpreter, State, Typestate } from 'xstate'
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
  app: {
    state?: State<TContext, TEvent, any, TTypestate>
    send?: Interpreter<TContext, any, TEvent, TTypestate>['send']
    service?: Interpreter<TContext, any, TEvent, TTypestate>
  }
  actors: {
    ui: any
    node: any
  }
}

export const MachineContext = React.createContext<
  MachineContextProps<ContextApp, EventApp, StateApp>
>({
  app: {
    state: undefined,
    send: undefined,
    service: undefined,
  },
  actors: {
    ui: undefined,
    node: undefined,
  },
})

export const MachineProvider = (
  props: PropsWithChildren<MachineProps<ContextApp, StateSchemaApp, EventApp>>,
) => {
  const { machine, children } = props
  const [state, send, service] = useMachine(machine)

  const value = {
    app: {
      state,
      send,
      service,
    },
    actors: {
      ui: state.context?.ui,
      node: state.context?.node,
    },
  }

  return (
    <MachineContext.Provider value={value}>{children}</MachineContext.Provider>
  )
}
