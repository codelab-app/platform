import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import Head from 'next/head'
import React from 'react'

const Page500: CodelabPage = () => {
  return (
    <>
      <Head>
        <title>Internal Server Error</title>
      </Head>
      <h1>500 - Internal Server Error</h1>
    </>
  )
}

export default Page500

export const getServerSideProps = withPageAuthRedirect()

Page500.displayName = 'Page500'
