import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { appDevelopmentQuery } from '@codelab/frontend-application-app/use-cases/app-development'
import { useRouteChangeHandler } from '@codelab/frontend-application-builder/hooks'
import { PagePreview } from '@codelab/frontend-application-builder/use-cases/page-preview'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import React from 'react'

const PagePreviewRoute = async ({
  params: { appSlug, pageSlug },
}: {
  params: { appSlug: string; pageSlug: string }
}) => {
  const user = await getServerUser()

  const dto = await appDevelopmentQuery({
    appSlug,
    pageSlug,
    userId: user.id,
  })

  // useRouteChangeHandler(result?.app.pages, PageType.PageDetail)

  return <PagePreview dto={dto} pageSlug={pageSlug} />
}

export default PagePreviewRoute
