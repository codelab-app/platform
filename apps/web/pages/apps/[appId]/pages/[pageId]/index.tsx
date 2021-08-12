import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  defaultRenderContext,
  Renderer,
} from '@codelab/frontend/modules/builder'
import {
  PageContext,
  RenderProvider,
  withPageQueryProvider,
} from '@codelab/frontend/presenter/container'
import { Empty } from 'antd'
import React, { useContext } from 'react'
import { PageDetailHeader } from '../../../../../src/sections/header'
import { NextPageTemplate } from '../../../../../src/templates/Layout.interface'
import { PageRendererTemplate } from '../../../../../src/templates/PageRendererTemplate'

const PageRenderer: NextPageTemplate<'builder'> = () => {
  const { tree, page, loading } = useContext(PageContext)

  if (loading) {
    return null
  }

  if (!tree || !page) {
    return <Empty />
  }

  return (
    <RenderProvider
      context={defaultRenderContext({
        tree,
      })}
    >
      <Renderer />
    </RenderProvider>
  )
}

export const getServerSideProps = withPageAuthRequired()

PageRenderer.Template = withPageQueryProvider(PageRendererTemplate)
PageRenderer.Header = PageDetailHeader

export default PageRenderer
