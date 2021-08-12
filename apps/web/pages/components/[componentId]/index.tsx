import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Builder,
  defaultRenderContext,
} from '@codelab/frontend/modules/builder'
import {
  ComponentContext,
  RenderProvider,
  withComponentQueryProvider,
} from '@codelab/frontend/presenter/container'
import { Empty } from 'antd'
import React, { useContext } from 'react'
import {
  MainPaneComponentDetail,
  MetaPaneComponentDetail,
} from '../../../src/sections/panes'
import { ComponentDetailTemplate } from '../../../src/templates/ComponentDetailTemplate'
import { NextPageTemplate } from '../../../src/templates/Layout.interface'

const ComponentDetail: NextPageTemplate<'builder'> = () => {
  const { component, elements, tree } = useContext(ComponentContext)

  if (!tree || !component) {
    return <Empty />
  }

  return (
    <RenderProvider context={defaultRenderContext({ tree })}>
      <Builder />
    </RenderProvider>
  )
}

export const getServerSideProps = withPageAuthRequired()

ComponentDetail.Template = withComponentQueryProvider(ComponentDetailTemplate)
ComponentDetail.MainPane = MainPaneComponentDetail
ComponentDetail.MetaPane = MetaPaneComponentDetail

export default ComponentDetail
