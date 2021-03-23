import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PageHeader } from 'antd'
import React from 'react'
import { padding } from '../../src/styles/sectionStyle'
import { CreateAppButton, GetAppsList } from '../../src/useCases/apps'
import { SignOutUserButton } from '../../src/useCases/user'

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
export const getServerSideProps = withPageAuthRequired()

export default AppsPage
