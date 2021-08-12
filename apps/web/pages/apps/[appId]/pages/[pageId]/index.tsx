import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import {
  defaultRenderContext,
  Renderer,
} from '@codelab/frontend/modules/builder'
import {
  PageDetailHeader,
  PageRendererTemplate,
} from '@codelab/frontend/modules/page'
import {
  PageContext,
  RenderProvider,
  withPageQueryProvider,
} from '@codelab/frontend/presenter/container'
import { Empty } from 'antd'
import React, { useContext } from 'react'

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
