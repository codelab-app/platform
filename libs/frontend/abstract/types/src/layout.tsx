import type { NextPage } from 'next'
import type { JSXElementConstructor } from 'react'
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
 */
export interface PageProps<Props, ChildrenProps> {
  // getLayout?: (
  //   page: NextComponentType<NextPageContext, any, P>,
  // ) => JSX.Element | JSXElementConstructor<any>
  Layout?: JSXElementConstructor<PropsWithRenderChildren<Props, ChildrenProps>>
}

/**
 * There are ReactElement, ReactNode, JSX.Element, & JSXElementConstructor
 */
