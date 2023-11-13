import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import React from 'react'

const AppsPage: CodelabPage = () => {
  return <>Hello world apps3</>
}

export default AppsPage

export const getServerSideProps = auth0Instance().withPageAuthRequired()

AppsPage.Layout = ({ children }) => <>{children()}</>
