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
export type PageProps = {
  Template: JSXElementConstructor<TemplateProps> | null
  Header: JSXElementConstructor<any> | null
  MetaPane: JSXElementConstructor<any> | null
  MainPane: JSXElementConstructor<any> | null
  SidebarNavigation: JSXElementConstructor<any> | null
}

/**
 * A Next.js Page could set any of these settings.
 *
 * We force the settings of these keys, assign to null if not used. This gives a more consistent picture for each page
 */
export type CodelabPage<P = unknown, IP = P> = NextPage<P, IP> & PageProps
