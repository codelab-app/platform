import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { useComponentQuery } from '@codelab/frontend/presentation/container'
import {
  BuilderPrimarySidebar,
  BuilderTabs,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend-application-builder/sections'
import { BuilderViewLayout } from '@codelab/frontend-application-builder/views'
import { useComponentDevelopment } from '@codelab/frontend-application-component/use-cases/component-development'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect, useMemo } from 'react'

const ComponentBuilderView: CodelabPage = observer(() => {
  const { componentName } = useComponentQuery()

  const [{ error, status }, loadDevelopmentComponent] = useComponentDevelopment(
    {
      rendererType: RendererType.ComponentBuilder,
    },
  )

  const isLoading = status === 'loading'
  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])

  useEffect(() => {
    void loadDevelopmentComponent.execute()
  }, [componentName])

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
        ],
      }}
      contentStyles={contentStyles}
    >
      <Head>
        <title>{componentName} | Builder | Codelab</title>
      </Head>

      <BuilderTabs error={error} isLoading={isLoading} />
    </DynamicDashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRedirect()

ComponentBuilderView.Layout = BuilderViewLayout

export default ComponentBuilderView
