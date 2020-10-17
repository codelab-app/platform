import React from 'react'
import { layoutData } from './Layout.data'
import { Renderer } from '@codelab/core/renderer'
import { ComponentProps } from '@codelab/shared/interface/component'
import { ContextModal, EventModal } from '@codelab/state/modal'
import { withActor } from '@codelab/ui/hoc'

type LayoutProps = {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  sidebar?: React.ReactNode
}
const LayoutSrc = (
  props: ComponentProps<ContextModal, EventModal, LayoutProps>,
) => {
  const { ...restProps } = props
  const Sidebar = () => <></>

  const Header = () => <></>

  const Footer = () => <h1>Footer</h1>

  const LayoutComp = Renderer.components<
    ComponentProps<ContextModal, EventModal, LayoutProps>
  >(layoutData)

  return (
    <LayoutComp
      {...restProps}
      header={<Header />}
      footer={<Footer />}
      sidebar={<Sidebar />}
    />
  )
}

export const Layout: React.FC<ComponentProps<
  ContextModal,
  EventModal,
  LayoutProps
>> = withActor<ContextModal, EventModal, LayoutProps>(LayoutSrc)
