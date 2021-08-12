import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
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

const PageRender: NextPageTemplate<'default'> = () => {
  const { page, loading, tree } = useContext(PageContext)

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

PageRender.Template = withPageQueryProvider(({ children }) => <>{children}</>)

export default PageRender
