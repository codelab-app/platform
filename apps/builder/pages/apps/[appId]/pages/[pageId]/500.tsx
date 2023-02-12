import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const Page500: CodelabPage = observer(() => {
  return (
    <>
      <Head>
        <title>Internal Server Error</title>
      </Head>
      <h1>500 - Internal Server Error</h1>
    </>
  )
})

export default Page500

export const getServerSideProps = auth0Instance.withPageAuthRequired({})

Page500.displayName = 'Page500'
