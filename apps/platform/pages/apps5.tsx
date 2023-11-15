import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { GetServerSidePropsContext } from 'next'
import React from 'react'

const AppsPage: CodelabPage = () => {
  console.log('testing client-side log')

  return <>Hello world apps5</>
}

AppsPage.Layout = ({ children }) => <>{children()}</>

export default AppsPage
