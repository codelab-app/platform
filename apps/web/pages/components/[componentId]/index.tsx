import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import {
  Builder,
  defaultRenderContext,
} from '@codelab/frontend/modules/builder'
import {
  ComponentDetailMainPane,
  ComponentDetailMetaPane,
  ComponentDetailTemplate,
} from '@codelab/frontend/modules/component'
import {
  ComponentContext,
  RenderProvider,
  withComponentQueryProvider,
} from '@codelab/frontend/presenter/container'
import { Empty } from 'antd'
import React, { useContext } from 'react'

const ComponentDetail: NextPageTemplate<'builder'> = () => {
  const { component, tree } = useContext(ComponentContext)

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
ComponentDetail.MainPane = ComponentDetailMainPane
ComponentDetail.MetaPane = ComponentDetailMetaPane

export default ComponentDetail
