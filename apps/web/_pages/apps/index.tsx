import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { GetAppsList } from '@codelab/frontend-application-app/use-cases/get-apps'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import type { IAppsView } from '@codelab/frontend-application-app/views'
import { AppsViewLayout } from '@codelab/frontend-application-app/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import type { IRef } from '@codelab/shared/abstract/core'
import { useAsync } from '@react-hookz/web'
import { Spin } from 'antd'
import Head from 'next/head'
import React, { useEffect } from 'react'

const AppsView: IAppsView = (props) => {
  const { appService, userService } = useStore()
  const user = userService.user

  const [{ status }, loadAppsPreview] = useAsync((owner: IRef) =>
    appService.loadAppsPreview({ owner }),
  )

  useEffect(() => {
    void loadAppsPreview.execute({ id: user.id })
  }, [user, loadAppsPreview])

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />

      <ContentSection>
        {status === 'loading' || status === 'not-executed' ? (
          <Spin />
        ) : (
          <GetAppsList />
        )}
      </ContentSection>
    </>
  )
}

export default AppsView

// https://www.quintessential.gr/blog/development/how-to-integrate-redux-with-next-js-and-ssr
/**
 * This gets called on SSR, and props are passed to _app
 */
export const getServerSideProps = withPageAuthRedirect()

AppsView.Layout = AppsViewLayout

export const config = {
  // after login this is the page where user is redirected to,
  // cold start may take longer than default 15s on first login
  maxDuration: 30,
}
