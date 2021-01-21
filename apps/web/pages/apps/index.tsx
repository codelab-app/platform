import { PageHeader, Spin } from 'antd'
import { useRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { withAuthGuardServerSideProps } from '../../../../libs/frontend/src/infrastructure/auth/withAuthServerSideProps'
import { padding, withApollo } from '@codelab/frontend'
import { CreateAppButton, GetAppsList } from '@codelab/modules/app-stories'
import { useUserMachine } from '@codelab/modules/user-stories'

const Loading = R.always('Loading...')

const withLoading = (Comp: React.FC) =>
  R.ifElse(R.prop('loading'), Loading, Comp)

const isLoadingUser = (user: any) => {
  return user.state.matches('initialCheck')
}

const AppsPage = () => {
  const router = useRouter()
  const user = useUserMachine()

  if (user.state.matches('initialCheck')) {
    return <Spin />
  }

  return (
    <>
      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Apps"
        extra={[<CreateAppButton key={1} />]}
      />
      <section style={{ marginTop: padding.sm }}>
        <GetAppsList />
      </section>
    </>
  )
}

export const getServerSideProps = withAuthGuardServerSideProps('/login')

export default R.pipe(withApollo, AppsPage)
