import React from 'react'
import { layoutData } from './Layout.data'
import { Renderer } from '@codelab/alpha/core/renderer'
import { ComponentProps } from '@codelab/alpha/shared/interface/component'
import { withActor } from '@codelab/alpha/ui/hoc'

type LayoutProps = {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  sidebar?: React.ReactNode
}

export const Layout: React.FC<ComponentProps> = withActor(
  Renderer.components<ComponentProps>(layoutData),
)
