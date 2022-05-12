import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { useCurrentApp } from '@codelab/frontend/modules/app'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderMainPane,
  BuilderSidebarNavigation,
  MetaPane,
} from '@codelab/frontend/modules/builder'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useStatefulExecutor,
} from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const AppProviderBuilder: CodelabPage<any> = observer(() => {
  const {
    pageService,
    appService,
    elementService,
    pageElementTree,
    providerElementTree,
    builderService,
    pageBuilderRenderService,
  } = useStore()

  const currentAppId = useCurrentAppId()
  const currentPageId = useCurrentPageId()
  const { app } = useCurrentApp(appService)

  // Load the pages list for the top bar
  useStatefulExecutor(() => pageService.getAll({ app: { id: currentAppId } }), {
    executeOnMount: true,
  })

  const [, { isLoading, error }] = useStatefulExecutor(
    async () => {
      // Load the page we're rendering
      const page = await pageService.getOne(currentPageId)

      if (!page) {
        throw new Error('Page not found')
      }

      // Get provider tree
      const providerTree = await providerElementTree.getTree(
        page.providerElement.id,
        true,
      )

      // initialize renderer
      await pageBuilderRenderService.init(
        pageElementTree,
        providerElementTree,
        null,
      )

      return { page, providerTree }
    },
    { executeOnMount: true },
  )

  const elementTree = pageBuilderRenderService.tree

  return (
    <>
      <Head>
        <title>{app?.name} | Provider Builder | Codelab</title>
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

export default AppProviderBuilder

export const getServerSideProps = withPageAuthRequired()

AppProviderBuilder.Layout = observer((page) => {
  const {
    pageElementTree,
    builderService,
    elementService,
    pageService,
    atomService,
    componentService,
    userService,
    typeService,
    componentBuilderRenderService,
    pageBuilderRenderService,
  } = useStore()

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
    >
      <BuilderDashboardTemplate
        Header={() => <PageDetailHeader pageService={pageService} />}
        MainPane={observer(() => (
          <BuilderMainPane
            atomService={atomService}
            builderService={builderService}
            componentBuilderRenderService={componentBuilderRenderService}
            componentService={componentService}
            elementService={elementService}
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
        headerHeight={38}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})
