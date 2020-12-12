import { useActor } from '@xstate/react'
import React from 'react'
import { EventObject } from 'xstate'
import { ComponentProps } from '@codelab/alpha/shared/interface/component'

export const withActor = <TContext, TEvent extends EventObject, TProps = any>(
  Component: React.FC<ComponentProps<TContext, TEvent, TProps>>,
) => (props: ComponentProps<TContext, TEvent, TProps>) => {
  const { actor, children } = props

  const [state, send] = useActor<TContext, TEvent>(actor)

  const innerProps = {
    ...props,
    state,
    send,
  }

  return children ? (
    <Component {...innerProps}>{children}</Component>
  ) : (
    <Component {...innerProps} />
  )
}
