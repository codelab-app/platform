/* eslint-disable @typescript-eslint/ban-types */
import { NextPage } from 'next'
import { ComponentType } from 'react'

type LayoutVariant = 'default' | 'builder' | 'component' | 'dashboard'

export type WithLayout<TLayout extends LayoutVariant, P = unknown> = {
  Layout: LayoutComponent<TLayout, P>
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

type WithLayoutProps<TLayout extends LayoutVariant> = TLayout extends 'default'
  ? {}
  : WithMainPane &
      WithMetaPane &
      (TLayout extends 'dashboard' ? WithSidebarNavigation : {})

export type NextPageLayout<
  TLayout extends LayoutVariant = 'default',
  P = unknown,
  IP = P,
> = NextPage<P, IP> & WithLayout<TLayout, P> & WithLayoutProps<TLayout>

export type LayoutComponent<
  TLayout extends LayoutVariant = 'default',
  P = {},
> = ComponentType<P & WithLayoutProps<TLayout>>
