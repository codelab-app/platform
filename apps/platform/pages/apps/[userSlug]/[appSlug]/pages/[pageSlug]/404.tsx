import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/domain/shared'
import Head from 'next/head'
import React from 'react'

const Page404: CodelabPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <h1>404 - Page not found</h1>
    </>
  )
}

export default Page404

export const getServerSideProps = withPageAuthRedirect({})

Page404.displayName = 'Page404'
