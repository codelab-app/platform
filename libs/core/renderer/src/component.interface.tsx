import { Node } from '@codelab/core/node'
import { Props } from '@codelab/shared/interface/props'
import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
} from 'react'

export type Factory<P extends Props> = (node: Node<P>) => FactoryComponent<P>

export type RenderComponent<P extends ComponentProps> = (
  props: P,
) => ReactElement<any, any> | null

export type FactoryComponent<
  P extends ComponentProps,
  T extends HTMLElement = any
> =
  | RenderComponent<P>
  // | FunctionComponent<P>
  // Return type of React.forwardRef
  | ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

export type ComponentProps = Props
