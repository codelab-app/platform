import { RendererType } from '@codelab/frontend/abstract/domain'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared'
import {
  BuilderContext,
  BuilderPrimarySidebar,
  BuilderTabs,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend/application/builder'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend/application/page'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import {
  useCurrentComponent,
  useRenderedComponent,
} from '@codelab/frontend/presentation/container'
import {
  DashboardTemplate,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect, useMemo } from 'react'

const ComponentBuilder: CodelabPage = observer(() => {
  const { componentName } = useCurrentComponent()

  const [{ error, status }, loadCurrentPage] = useRenderedComponent(
    RendererType.ComponentBuilder,
  )

  const isLoading = status !== 'success'
  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  useEffect(() => {
    void loadCurrentPage.execute()
  }, [componentName])

  return (
    <DashboardTemplate
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
      headerHeight={48}
    >
      <Head>
        <title>{componentName} | Builder | Codelab</title>
      </Head>

      <BuilderTabs error={error} isLoading={isLoading} />
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRedirect()

ComponentBuilder.Layout = observer(({ children }) => {
  return <BuilderContext>{children()}</BuilderContext>
})

export default ComponentBuilder

ComponentBuilder.displayName = 'ComponentBuilder'
