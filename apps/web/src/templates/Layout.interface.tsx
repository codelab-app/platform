/* eslint-disable @typescript-eslint/ban-types */
import { NextPage } from 'next'
import { ComponentType } from 'react'

type LayoutVariant = 'default' | 'builder' | 'component' | 'dashboard'

/**
 * A Template can use from a selection of existing Layouts
 */
export type WithTemplate<TLayout extends LayoutVariant, P = unknown> = {
  Template: LayoutComponent<TLayout, P>
}

export type WithHeader = {
  Header?: ComponentType
}

export type WithMainPane = {
  MainPane?: ComponentType
}

export type WithMetaPane = {
  MetaPane?: ComponentType
}

export type WithSidebarNavigation = {
  SidebarNavigation?: ComponentType
}

export type WithLayoutProps<TLayout extends LayoutVariant> =
  TLayout extends 'default'
    ? WithHeader
    : WithHeader &
        WithMainPane &
        WithMetaPane &
        (TLayout extends 'dashboard' ? WithSidebarNavigation : {})

/**
 * Used for Next.js pages
 */
export type NextPageTemplate<
  TLayout extends LayoutVariant = 'default',
  P = unknown,
  IP = P,
> = NextPage<P, IP> & WithTemplate<TLayout, P> & WithLayoutProps<TLayout>

export type LayoutComponent<
  TLayout extends LayoutVariant = 'default',
  P = {},
> = ComponentType<P & WithLayoutProps<TLayout>>
