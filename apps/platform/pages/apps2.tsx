import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import React from 'react'

const AppsPage: CodelabPage = () => {
  return <>Hello world apps2</>
}

export default AppsPage

export const getServerSideProps = withPageAuthRedirect()

AppsPage.Layout = ({ children }) => <>{children()}</>
