import { NextPage } from 'next'
import { ComponentType } from 'react'

export type CodelabPage<TP, P = any, IP = P> = NextPage<P, IP> & PageProps<TP>

/**
 * These are the props a page requires. We don't pass any props into these components
 */
export type PageProps<TP = any> = {
  Template?: ComponentType<TP>
  templateProps?: TP
  providers?: Array<ComponentType>
}
