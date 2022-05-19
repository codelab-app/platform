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
  BuilderMainPane,
  BuilderSidebarNavigation,
  MetaPane,
} from '@codelab/frontend/modules/builder'
import {
  extractErrorMessage,
  useStatefulExecutor,
} from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const ComponentDetail: CodelabPage<DashboardTemplateProps> = observer(() => {
  const {
    builderService,
    elementService,
    componentService,
    pageBuilderRenderService,
  } = useStore()

  const { query } = useRouter()
  const currentComponentId = query.componentId as string

  const [, { isLoading, error, data }] = useStatefulExecutor(
    async () => {
      // Load the component we're rendering
      const component = await componentService.getOne(currentComponentId)

      if (!component) {
        throw new Error('Component not found')
      }

      // Get element tree
      const elementTree = await componentService.elementTrees
        .get(component.id)
        ?.getTree(component.rootElementId)

      if (elementTree) {
        // initialize renderer
        await pageBuilderRenderService.init(elementTree, null, null)
      }

      return { component, elementTree }
    },
    { executeOnMount: true },
  )

  const elementTree = pageBuilderRenderService.tree

  return (
    <>
      <Head>
        <title>{data?.component?.name} | Codelab</title>
      </Head>

      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}

      {elementTree ? (
        <Builder
          currentDragData={builderService.currentDragData}
          deleteModal={elementService.deleteModal}
          elementTree={elementTree}
          key={pageBuilderRenderService.tree?.root?.id}
          rendererProps={{
            isInitialized: pageBuilderRenderService.isInitialized,
            renderRoot: pageBuilderRenderService.renderRoot.bind(
              pageBuilderRenderService,
            ),
          }}
          selectedElement={builderService.selectedElement}
          setHoveredElement={builderService.setHoveredElement.bind(
            builderService,
          )}
          setSelectedTreeNode={builderService.setSelectedTreeNode.bind(
            builderService,
          )}
        />
      ) : null}
    </>
  )
})

export const getServerSideProps = withPageAuthRequired()

ComponentDetail.Layout = observer((page) => {
  const {
    builderService,
    elementService,
    atomService,
    componentService,
    userService,
    typeService,
    pageElementTree,
    pageBuilderRenderService,
    componentBuilderRenderService,
  } = useStore()

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
    >
      <BuilderDashboardTemplate
        MainPane={observer(() => (
          <BuilderMainPane
            atomService={atomService}
            builderService={builderService}
            componentBuilderRenderService={componentBuilderRenderService}
            componentService={componentService}
            elementService={elementService}
            key={pageBuilderRenderService.tree?.root?.id}
            pageBuilderRenderService={pageBuilderRenderService}
            pageElementTree={pageElementTree}
            userService={userService}
          />
        ))}
        MetaPane={observer(() => (
          <MetaPane
            atomService={atomService}
            builderService={builderService}
            componentService={componentService}
            elementService={elementService}
            elementTree={pageElementTree}
            key={pageBuilderRenderService.tree?.root?.id}
            renderService={pageBuilderRenderService}
            typeService={typeService}
          />
        ))}
        SidebarNavigation={observer(() => (
          <BuilderSidebarNavigation
            builderTab={builderService.builderTab}
            setBuilderTab={builderService.setBuilderTab}
          />
        ))}
        builderService={builderService}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})

export default ComponentDetail
