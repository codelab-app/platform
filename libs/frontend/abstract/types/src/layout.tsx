import { NextPage } from 'next'
import { JSXElementConstructor } from 'react'

export type CodelabPage<P = any, IP = P> = NextPage<P, IP> & PageProps

/**
 * These are the props a page requires. We don't pass any props into these components
 */
export type PageProps = {
  // getLayout?: (
  //   page: NextComponentType<NextPageContext, any, P>,
  // ) => JSX.Element | JSXElementConstructor<any>
  Layout?: JSXElementConstructor<any>
}

/**
 * There are ReactElement, ReactNode, JSX.Element, & JSXElementConstructor
 */
