import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { defaultRenderContext, Renderer } from '@codelab/frontend/builder'
import {
  PageContext,
  RenderProvider,
  withPageQueryProvider,
} from '@codelab/frontend/shared'
import { Empty } from 'antd'
import React, { useContext } from 'react'
import { NextPageTemplate } from '../../../../../src/templates/Layout.interface'

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
