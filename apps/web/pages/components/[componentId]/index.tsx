import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Builder } from '@codelab/frontend/builder'
import {
  ComponentContext,
  withComponentQueryProvider,
} from '@codelab/modules/component'
import { Empty } from 'antd'
import React, { useContext } from 'react'
import {
  MainPaneComponentDetail,
  MetaPaneComponentDetail,
} from '../../../src/sections/panes'
import { ComponentDetailTemplate } from '../../../src/templates/ComponentDetailTemplate'
import { NextPageTemplate } from '../../../src/templates/Layout.interface'

const ComponentDetail: NextPageTemplate<'builder'> = () => {
  const { tree, component } = useContext(ComponentContext)

  if (!tree || !component) {
    return <Empty />
  }

  return <Builder tree={tree} />
}

export const getServerSideProps = withPageAuthRequired()

ComponentDetail.Template = withComponentQueryProvider(ComponentDetailTemplate)
ComponentDetail.MainPane = MainPaneComponentDetail
ComponentDetail.MetaPane = MetaPaneComponentDetail

export default ComponentDetail
