import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPane,
  MetaPaneBuilderComponent,
} from '@codelab/frontend/modules/builder'
import {
  extractErrorMessage,
  useLoadingState,
} from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const ComponentDetail: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  const { query } = useRouter()
  const currentComponentId = query.componentId as string

  const [, { isLoading, error, data }] = useLoadingState(
    async () => {
      // Load the component we're rendering
      const component = await store.componentService.getOne(currentComponentId)

      if (!component) {
        throw new Error('Component not found')
      }

      // Get element tree
      const elementTree = await store.elementService.getTree(
        component.rootElementId,
      )

      // initialize renderer
      await store.builderService.builderRenderer.init(
        store.elementService.elementTree,
        null,
        null,
      )

      return { component, elementTree }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.component?.name} | Codelab</title>
      </Head>

      {error && <Alert type="error">{extractErrorMessage(error)}</Alert>}
      {isLoading && <Spin />}

      <Builder
        builderService={store.builderService}
        elementService={store.elementService}
        key={store.builderService.builderRenderer.tree?.root?.id}
      />
    </>
  )
})

export const getServerSideProps = withPageAuthRequired()

ComponentDetail.Layout = observer((page) => {
  const store = useStore()

  return (
    <BuilderContext
      builderService={store.builderService}
      elementService={store.elementService}
    >
      <BuilderDashboardTemplate
        MainPane={observer(() => (
          <MainPane
            atomService={store.atomService}
            builderService={store.builderService}
            componentService={store.componentService}
            elementService={store.elementService}
            key={store.builderService.builderRenderer.tree?.root?.id}
          />
        ))}
        MetaPane={observer(() => (
          <MetaPaneBuilderComponent
            atomService={store.atomService}
            builderService={store.builderService}
            elementService={store.elementService}
            key={store.builderService.builderRenderer.tree?.root?.id}
            typeService={store.typeService}
          />
        ))}
        SidebarNavigation={observer((props) => (
          <BuilderSidebarNavigation
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            builderService={store.builderService}
            key={store.builderService.builderRenderer.tree?.root?.id}
          />
        ))}
        builderService={store.builderService}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})

export default ComponentDetail
