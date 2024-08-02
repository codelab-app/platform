import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import type { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'

export const metadata: Metadata = {
  title: 'Lambdas | Codelab',
}

const LambdasRoute = () => {
  return (
    <>
      {/* <CreateLambdaModal />
      <UpdateLambdaModal />
      <DeleteLambdaModal />
      <ContentSection>
        <GetLambdasTable />
      </ContentSection> */}
    </>
  )
}

export default LambdasRoute
