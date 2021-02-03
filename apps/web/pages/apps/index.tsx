import { PageHeader } from 'antd'
import React from 'react'
import { CreateAppButton, GetAppsList } from '../../src/useCases/apps'
import { SignOutUserButton } from '../../src/useCases/user'
import { padding, withAuthGuardServerSideProps } from '@codelab/frontend'

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

export default AppsPage
