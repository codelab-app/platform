import { PageHeader } from 'antd'
import * as R from 'ramda'
import React from 'react'
import { CreateAppButton, GetAppsList } from '../../src/apps'
import { SignOutUserButton } from '../../src/user'
import {
  padding,
  withApollo,
  withAuthGuardServerSideProps,
} from '@codelab/frontend'

const AppsPage = () => {
  const pageHeaderButtons = [
    <CreateAppButton key={1} />,
    <SignOutUserButton key={2} />,
  ]

  return (
    <>
      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Apps"
        extra={pageHeaderButtons}
      />
      <section style={{ marginTop: padding.sm }}>
        <GetAppsList />
      </section>
    </>
  )
}

// Redirect to home if not authenticated
export const getServerSideProps = withAuthGuardServerSideProps({
  destination: '/',
  permanent: false,
})

export default R.pipe(withApollo, AppsPage)
