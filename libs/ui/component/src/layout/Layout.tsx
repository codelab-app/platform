import React from 'react'
import { layoutData } from './Layout.data'
import { Renderer } from '@codelab/core/renderer'
import { ComponentProps } from '@codelab/shared/interface/component'
import { ContextLayout, EventLayout } from '@codelab/state/layout'
import { withActor } from '@codelab/ui/hoc'

type LayoutProps = {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  sidebar?: React.ReactNode
}

export const Layout: React.FC<
  ComponentProps<ContextLayout, EventLayout, LayoutProps>
> = withActor<ContextLayout, EventLayout, LayoutProps>(
  Renderer.components<ComponentProps<ContextLayout, EventLayout, LayoutProps>>(
    layoutData,
  ),
)
