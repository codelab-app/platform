import { NextPage } from 'next'
import { PropsWithChildren } from 'react'

export type WithLayout = {
  Layout: (props: any) => React.ReactElement
}

export type WithMainPane = {
  MainPane: (props: any) => React.ReactElement
}

export type WithMetaPane = {
  MetaPane?: (props: any) => React.ReactElement
}

export type NextPageLayout<
  P extends 'default' | 'builder' | 'component' = 'default',
  IP = P,
> = P extends 'default'
  ? PropsWithChildren<NextPage<P, IP> & WithLayout>
  : PropsWithChildren<
      NextPage<P, IP> & WithLayout & WithMainPane & WithMetaPane
    >
