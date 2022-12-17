import type { NextPage } from 'next'
import type { JSXElementConstructor, PropsWithChildren } from 'react'

export type CodelabPage<P = unknown, IP = P> = NextPage<P, IP> & PageProps

/**
 * These are the props a page requires. We don't pass any props into these components
 */
export interface PageProps {
  // getLayout?: (
  //   page: NextComponentType<NextPageContext, any, P>,
  // ) => JSX.Element | JSXElementConstructor<any>
  Layout?: JSXElementConstructor<PropsWithChildren<unknown>>
}

/**
 * There are ReactElement, ReactNode, JSX.Element, & JSXElementConstructor
 */
