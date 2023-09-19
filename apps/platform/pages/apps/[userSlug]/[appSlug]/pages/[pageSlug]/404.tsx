import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
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

export const getServerSideProps = withPageAuthRequired({})

Page404.displayName = 'Page404'
