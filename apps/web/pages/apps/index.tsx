import { PageHeader } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { padding, withApollo } from '@codelab/frontend'
import { CreateAppButton, GetAppsList } from '@codelab/modules/app-stories'

const AppsPage = () => {
  const router = useRouter()

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
