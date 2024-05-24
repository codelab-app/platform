import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { ComponentsPrimarySidebar } from '@codelab/frontend-application-builder/sections/explorer-pane/ComponentsPrimarySidebar'
import { BuilderViewLayout } from '@codelab/frontend-application-builder/views'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth/guards'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const ComponentsView: CodelabPage = observer(() => {
  return (
    <DynamicDashboardTemplate
      Header={ComponentDetailHeader}
      PrimarySidebar={{
        default: ExplorerPaneType.Components,
        items: [
          {
            key: ExplorerPaneType.Components,
            render: () => <ComponentsPrimarySidebar isLoading={false} />,
          },
        ],
      }}
    >
      <Head>
        <title>Components</title>
      </Head>
    </DynamicDashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRedirect()

ComponentsView.Layout = BuilderViewLayout

export default ComponentsView
