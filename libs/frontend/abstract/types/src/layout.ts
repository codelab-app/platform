import type { NextPage } from 'next'
import type { FunctionComponent, JSXElementConstructor } from 'react'
import type { PropsWithRenderChildren } from './children'

/**
 * @typeparam {P} Props
 * @typeparam {IP} Initial props
 * @typeparam {RCP} Render children props
 *
 */
export type CodelabPage<P = unknown, IP = P, RCP = unknown> = NextPage<P, IP> &
  PageProps<P, RCP>

/**
 * These are the props a page requires. The children accepts a props as argument so we can pass data.
 *
 * We don't actually pass any data in these Layout components, since all data ins managed by mobx
 *
 */
export interface PageProps<Props, ChildrenProps> {
  Layout?: FunctionComponent<PropsWithRenderChildren<Props, ChildrenProps>>
}

/**
 * There are ReactElement, ReactNode, JSX.Element, & JSXElementConstructor
 */
