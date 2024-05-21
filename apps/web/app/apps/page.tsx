import {
  BuildAppModal,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  UpdateAppModal,
} from '@codelab/frontend/application/app'
import { getUser } from '@codelab/frontend/application/shared/auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ContentSection } from '@codelab/frontend/presentation/view'
import type { IRef } from '@codelab/shared/abstract/core'
import { useAsync } from '@react-hookz/web'
import { Spin } from 'antd'
import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import Loading from './loading'

export const metadata: Metadata = {
  title: 'Apps | Codelab',
}

const AppsPage = () => {
  return (
    <>
      {/* <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal /> */}

      <ContentSection>
        <Suspense fallback={<Loading />}>
          <GetAppsList />
        </Suspense>
      </ContentSection>
    </>
  )
}

export default AppsPage
