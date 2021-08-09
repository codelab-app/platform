import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Renderer } from '@codelab/frontend/builder'
import { PageContext, withPageQueryProvider } from '@codelab/modules/page'
import { Empty } from 'antd'
import React, { useContext } from 'react'
import { NextPageTemplate } from '../../../../../src/templates/Layout.interface'

const PageRender: NextPageTemplate<'default'> = () => {
  const { tree, page, loading } = useContext(PageContext)

  if (loading) {
    return null
  }

  if (!tree || !page) {
    return <Empty />
  }

  return <Renderer tree={tree} />
}

export const getServerSideProps = withPageAuthRequired()

PageRender.Template = withPageQueryProvider(({ children }) => <>{children}</>)

export default PageRender
