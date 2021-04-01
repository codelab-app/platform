import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PageHeader } from 'antd'
import React from 'react'
import {
  AppsPageQuery,
  CreateAppButton,
  GetAppsList,
} from '@codelab/modules/app'
import { SignOutUserButton } from '@codelab/modules/user'
import { padding } from '@codelab/frontend/style'
import { ssrPipe } from '@codelab/frontend/shared'
import { initEnvironment } from '@codelab/frontend/relay'
import { fetchQuery } from 'react-relay'

const AppsPage = (props: any) => {
  console.log(props)

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

export const getServerSideProps = ssrPipe(withPageAuthRequired, async () => {
  const environment = initEnvironment()
  const queryProps = await fetchQuery(environment, AppsPageQuery, {})
  const initialRecords = environment.getStore().getSource().toJSON()

  console.log('queryProps', queryProps)

  return {
    props: {
      // Commented out because https://github.com/vercel/next.js/issues/11993
      // ...queryProps,
      initialRecords,
    },
  }
})

export default AppsPage
