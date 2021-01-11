import { PageHeader } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { withApollo } from '@codelab/frontend'
import { CreateAppButton, GetAppsList } from '@codelab/modules/app-stories'

const AppsPage = () => {
  const router = useRouter()

  return (
    <section>
      <PageHeader
        ghost={false}
        onBack={() => router.back()}
        title="Apps"
        extra={[<CreateAppButton key={1} />]}
      />

      <div style={{ padding: '4rem' }}>
        <GetAppsList />
      </div>
    </section>
  )
}

export default withApollo(AppsPage)
