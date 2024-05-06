import type { NextPage } from 'next'
import type { FunctionComponent, PropsWithChildren } from 'react'

/**
 * @typeparam {P} Props
 * @typeparam {IP} Initial props
 *
 */
export type CodelabPage<P = unknown, IP = P> = NextPage<P, IP> & PageProps<P>

/**
 * These are the props a page requires. The children accepts a props as argument so we can pass data.
 *
 * We don't actually pass any data in these Layout components, since all data ins managed by mobx
 *
 */
export interface PageProps<Props> {
  Layout?: FunctionComponent<PropsWithChildren<Props>>
}

/**
 * There are ReactElement, ReactNode, JSX.Element, & JSXElementConstructor
 */
