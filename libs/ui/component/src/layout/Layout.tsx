import React from 'react'
import { layoutData } from './Layout.data'
import { Renderer } from '@codelab/core/renderer'
import { ComponentProps } from '@codelab/shared/interface/component'
import { ContextUI, EventUI } from '@codelab/state/ui'
import { withActor } from '@codelab/ui/hoc'

type LayoutProps = {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  sidebar?: React.ReactNode
}
const LayoutSrc = (props: ComponentProps<ContextUI, EventUI, LayoutProps>) => {
  const { ...restProps } = props

  const LayoutComp = Renderer.components<
    ComponentProps<ContextUI, EventUI, LayoutProps>
  >(layoutData)

  return <LayoutComp {...restProps} />
}

export const Layout: React.FC<ComponentProps<
  ContextUI,
  EventUI,
  LayoutProps
>> = withActor<ContextUI, EventUI, LayoutProps>(LayoutSrc)
