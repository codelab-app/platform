import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  BuilderContext,
  BuilderPrimarySidebar,
  BuilderTabs,
  ComponentsExplorerPane,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend/domain/builder'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend/domain/page'
import {
  useCurrentComponent,
  useRenderedComponent,
} from '@codelab/frontend/presentation/container'
import {
  DashboardTemplate,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect, useMemo } from 'react'

const ComponentBuilder: CodelabPage = observer(() => {
  const { componentName } = useCurrentComponent()
  const [{ error, status }, loadCurrentPage] = useRenderedComponent()
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
            render: () => <ComponentsExplorerPane isLoading={isLoading} />,
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

export const getServerSideProps = auth0Instance().withPageAuthRequired({})

ComponentBuilder.Layout = observer(({ children }) => {
  return <BuilderContext>{children()}</BuilderContext>
})

export default ComponentBuilder

ComponentBuilder.displayName = 'ComponentBuilder'
