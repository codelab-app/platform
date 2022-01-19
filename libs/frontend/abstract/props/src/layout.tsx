import { NextComponentType, NextPage } from 'next'
import { NextPageContext } from 'next/dist/shared/lib/utils'
import { JSXElementConstructor } from 'react'

export type CodelabPage<T, P = any, IP = P> = NextPage<P, IP> & PageProps<T>

/**
 * These are the props a page requires. We don't pass any props into these components
 */
export type PageProps<P> = {
  getLayout?: (
    page: NextComponentType<NextPageContext<any>, any, P>,
  ) => JSX.Element | JSXElementConstructor<any>
  Layout?: JSXElementConstructor<any>
}

/**
 * There are ReactElement, ReactNode, JSX.Element, & JSXElementConstructor
 */
