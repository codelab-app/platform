import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import type { GetServerSidePropsContext } from 'next'
import React from 'react'

const AppsPage: CodelabPage = () => {
  console.log('testing client-side log')

  return <>Hello world apps4</>
}

export default AppsPage

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  console.log('testing server-side log')

  return { props: {} }
}

AppsPage.Layout = ({ children }) => <>{children()}</>
