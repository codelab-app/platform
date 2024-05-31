import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { GetAppsList } from '@codelab/frontend-application-app/use-cases/get-apps'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import {
  AppsViewLayout,
  type IAppsView,
} from '@codelab/frontend-application-app/views'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { IRef } from '@codelab/shared/abstract/core'
import { useAsync } from '@react-hookz/web'
import { Spin } from 'antd'
import type { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

const AppsView = (props: object) => {
  // const { appService, userService } = useStore()
  // const user = userService.user

  // const [{ status }, loadAppsPreview] = useAsync((owner: IRef) =>
  //   appService.loadAppsPreview({ owner }),
  // )

  // useEffect(() => {
  //   void loadAppsPreview.execute({ id: user.id })
  // }, [user, loadAppsPreview])

  return (
    <>
      Apps
      {/* <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />

      <ContentSection>
        {status === 'loading' || status === 'not-executed' ? (
          <Spin />
        ) : (
          <GetAppsList />
        )}
      </ContentSection> */}
    </>
  )
}

export default AppsView
