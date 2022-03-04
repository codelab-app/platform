import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  Builder,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderComponent,
} from '@codelab/frontend/modules/builder'
import { useGetComponentsQuery } from '@codelab/frontend/modules/component'
import {
  ElementGraphProvider,
  useElementGraphContext,
} from '@codelab/frontend/modules/element'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import { Empty } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const ComponentDetail: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const { elementTree } = useElementGraphContext()

  if (!elementTree) {
    return <Empty />
  }

  const root = elementTree.getRootVertex(ElementTree.isComponent)

  return (
    <>
      <Head>
        <title>{root?.component?.name} | Codelab</title>
      </Head>

      <Builder
        isComponentBuilder
        tree={elementTree}
        typeStore={store.typeStore}
      />
    </>
  )
})

const ComponentElementGraphProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const componentId = query.componentId as string

  const { data, isLoading } = useGetComponentsQuery({
    variables: { where: { id: componentId } },
  })

  const rootElementId = data?.components[0]?.rootElement.id

  if (!rootElementId) {
    return null
  }

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <ElementGraphProvider elementId={rootElementId}>
        {children}
      </ElementGraphProvider>
    </SpinnerWrapper>
  )
}

export default ComponentDetail

export const getServerSideProps = withPageAuthRequired()

ComponentDetail.Layout = observer((page) => {
  const store = useStore()

  return (
    <ComponentElementGraphProvider>
      <BuilderDashboardTemplate
        MainPane={() => <MainPaneBuilder isComponentBuilder />}
        MetaPane={observer(() => (
          <MetaPaneBuilderComponent typeStore={store.typeStore} />
        ))}
        SidebarNavigation={BuilderSidebarNavigation}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </ComponentElementGraphProvider>
  )
})
