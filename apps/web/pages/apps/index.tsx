import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PageHeader } from 'antd'
import React from 'react'
import { CreateAppButton, GetAppsList } from '@codelab/modules/app'
import { SignOutUserButton } from '@codelab/modules/user'
import { padding } from '@codelab/frontend/style'
import { initEnvironment } from '@codelab/frontend/relay'
import {
  fetchQuery,
  graphql,
} from 'react-relay'
import { useQuery } from 'relay-hooks'
import { ssrPipe } from '@codelab/frontend/shared'

const AppsQuery = graphql`
  query appsQuery {
    app_connection {
      edges {
        node {
          id
        }
      }
    }
  }
`

const AppsPage = () => {
  const { error, data } = useQuery(AppsQuery)

  console.log(data)

  if (error) return <div>{error.message}</div>

  if (!data) return <div>Loading</div>

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
  const { environment, relaySSR } = initEnvironment()

  await fetchQuery(environment, AppsQuery, {})

  const relayData = (await relaySSR.getCache())?.[0]

  console.log(relayData)

  return {
    props: {
      relayData: !relayData ? null : [[relayData[0], relayData[1].json]],
    },
  }
})

export default AppsPage
