import { LayoutProps } from 'antd/lib/layout'
import { NextPage } from 'next'
import { JSXElementConstructor, ReactChild } from 'react'

export type TemplateProps = {
  layoutProps?: LayoutProps
  children?: ReactChild
} & Omit<PageProps, 'Template'>

/**
 * These are the props a page requires. We don't pass any props into these components
 */
export type PageProps<P = unknown> = {
  Template: JSXElementConstructor<TemplateProps & P> | null
  Header: JSXElementConstructor<P> | null
  MetaPane: JSXElementConstructor<P> | null
  MainPane: JSXElementConstructor<P> | null
  SidebarNavigation: JSXElementConstructor<P> | null
}

/**
 * A Next.js Page could set any of these settings.
 *
 * We force the settings of these keys, assign to null if not used. This gives a more consistent picture for each page
 */
export type CodelabPage<P = unknown, IP = P> = NextPage<P, IP> & PageProps<P>
