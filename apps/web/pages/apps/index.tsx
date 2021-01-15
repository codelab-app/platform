import { PageHeader } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { HOME_PAGE, withApollo, padding } from '@codelab/frontend'
import { CreateAppButton, GetAppsList } from '@codelab/modules/app-stories'
import { useUserMachine } from '@codelab/modules/user-stories'

const AppsPage = () => {
  const router = useRouter()
  const user = useUserMachine()

  if (!user.isAuthenticated && typeof window !== 'undefined') {
    router.push(HOME_PAGE.url)
  }

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => router.back()}
        title="Apps"
        extra={[<CreateAppButton key={1} />]}
      />
      <section style={{ marginTop: padding.sm }}>
        <GetAppsList />
      </section>
    </>
  )
}

export default withApollo(AppsPage)
