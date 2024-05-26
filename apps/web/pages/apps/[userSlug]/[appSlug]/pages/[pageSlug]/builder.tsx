import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  useAppQuery,
  usePageQuery,
} from '@codelab/frontend/presentation/container'
import { useAppDevelopment } from '@codelab/frontend-application-app/use-cases/app-development'
import {
  BuilderPrimarySidebar,
  BuilderTabs,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend-application-builder/sections'
import { BuilderViewLayout } from '@codelab/frontend-application-builder/views'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend-application-page/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect, useMemo } from 'react'

const PageBuilderView: CodelabPage = observer(() => {
  const { pageName } = usePageQuery()
  const { primarySidebarKey } = useAppQuery()

  const [{ error, status }, loadDevelopmentPage] = useAppDevelopment({
    rendererType: RendererType.PageBuilder,
  })

  useEffect(() => {
    void loadDevelopmentPage.execute()
  }, [pageName, primarySidebarKey])

  const isLoading = status === 'loading'
  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  return (
    <DynamicDashboardTemplate
      ConfigPane={() => (
        <SkeletonWrapper isLoading={isLoading}>
          <ConfigPaneInspectorTabContainer />
        </SkeletonWrapper>
      )}
      Header={PageDetailHeader}
      PrimarySidebar={{
        default: ExplorerPaneType.Explorer,
        items: [
          {
            key: ExplorerPaneType.Components,
            render: () => <ComponentsPrimarySidebar isLoading={isLoading} />,
          },
          {
            key: ExplorerPaneType.Explorer,
            render: () => <BuilderPrimarySidebar isLoading={isLoading} />,
          },
          {
            key: ExplorerPaneType.PageList,
            render: () => <PagesPrimarySidebar />,
          },
        ],
      }}
      contentStyles={contentStyles}
    >
      <Head>
        <title>{pageName} | Builder | Codelab</title>
      </Head>

      <BuilderTabs error={error} isLoading={isLoading} />
    </DynamicDashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRedirect()

PageBuilderView.Layout = BuilderViewLayout

export default PageBuilderView
