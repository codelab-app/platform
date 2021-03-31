import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PageHeader } from 'antd'
import React from 'react'
import {
  CreateAppButton,
  GetAppsList,
  // appsPageQuery,
} from '@codelab/modules/app'
import { SignOutUserButton } from '@codelab/modules/user'
import { padding } from '@codelab/frontend/style'
import { ssrPipe } from '@codelab/frontend/shared'

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
  // const environment = initEnvironment()
  // const queryProps = await fetchQuery(environment, appsPageQuery, {})
  // const initialRecords = environment.getStore().getSource().toJSON()

  return {}
  // return {
  //   props: {
  //     ...queryProps,
  //     initialRecords,
  //   },
  // }
})

export default AppsPage
