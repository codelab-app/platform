import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import { PageDetailHeader } from '@codelab/frontend/modules/page'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useLoadingState,
} from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

const PageBuilder: CodelabPage<any> = observer(() => {
  const store = useStore()
  const currentAppId = useCurrentAppId()
  const currentPageId = useCurrentPageId()

  // Load the pages list for the top bar
  useLoadingState(
    () => store.pageService.getAll({ app: { id: currentAppId } }),
    { executeOnMount: true },
  )

  const [, { isLoading, error, data }] = useLoadingState(
    () =>
      // Load the page we're rendering
      store.pageService.getOne(currentPageId).then(async (page) => {
        if (!page) {
          throw new Error('Page not found')
        }

        // Get element tree and provider tree
        const [elementTree, providerTree] = await Promise.all([
          store.elementService.getTree(page.rootElementId),
          store.providerElementService.getTree(page.providerElementId),
        ])

        // initialize renderer
        await store.renderService.init(
          store.elementService.elementTree,
          store.providerElementService.elementTree,
          null,
        )

        return { page, elementTree, providerTree }
      }),
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.page.name} | Builder | Codelab</title>
      </Head>

      {error && <Alert type="error">{extractErrorMessage(error)}</Alert>}
      {isLoading && <Spin />}

      <Builder
        builderService={store.builderService}
        elementService={store.elementService}
        typeService={store.typeService}
      />
    </>
  )
})

export const getServerSideProps = withPageAuthRequired({})

PageBuilder.Layout = observer((page) => {
  const store = useStore()

  return (
    <BuilderContext
      builderService={store.builderService}
      elementService={store.elementService}
    >
      <BuilderDashboardTemplate
        Header={() => <PageDetailHeader pages={store.pageService} />}
        MainPane={observer(() => (
          <MainPaneBuilder atomService={store.atomService} />
        ))}
        MetaPane={observer(() => (
          <MetaPaneBuilderPage
            atomService={store.atomService}
            builderService={store.builderService}
            elementService={store.elementService}
            typeService={store.typeService}
          />
        ))}
        SidebarNavigation={observer((props) => (
          <BuilderSidebarNavigation
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            builderService={store.builderService}
          />
        ))}
        headerHeight={38}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})

export default PageBuilder
