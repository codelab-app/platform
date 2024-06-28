import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  useAppQuery,
  usePageQuery,
} from '@codelab/frontend/presentation/container'
import { appDevelopmentQuery } from '@codelab/frontend-application-app/use-cases/app-development'
import {
  BuilderPrimarySidebar,
  BuilderTabs,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend-application-builder/sections'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { BuilderViewLayout } from '@codelab/frontend-application-builder/views'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend-application-page/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components/skeleton'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useMemo } from 'react'

// <Head>
//   <title>{pageName} | Builder | Codelab</title>
// </Head>

const PageBuilderRoute = async ({
  params: { appSlug, pageSlug, userSlug },
}: {
  params: { pageSlug: string; appSlug: string; userSlug: string }
}) => {
  const user = await getServerUser()

  // const { pageName } = usePageQuery()
  // const { primarySidebarKey } = useAppQuery()
  // const component = await getComponentQuery({
  //   where: { compositeKey: params.componentSlug },
  // })
  const dto = await appDevelopmentQuery({
    appSlug,
    pageSlug,
    userId: user.id,
  })

  return <PageBuilder dto={dto} pageSlug={pageSlug} />
}

// export const getServerSideProps = withPageAuthRedirect()

// PageBuilderView.Layout = BuilderViewLayout

export default PageBuilderRoute
