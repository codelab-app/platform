import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AppContext } from '@codelab/frontend/shared'
import React, { useContext } from 'react'
import { PageRenderer } from '@codelab/modules/page'
import { Empty } from 'antd'

const PageDetail = () => {
  const { page } = useContext(AppContext)

  if (!page) {
    return <Empty />
  }

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      <h1>{page?.name}</h1>
      <PageRenderer page={page} />
    </div>
  )
}

// Redirect to home if not authenticated
export const getServerSideProps = withPageAuthRequired()

export default PageDetail
