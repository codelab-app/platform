import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { getGraphQLClient } from '@codelab/frontend/model/infra/redux'
import {
  Builder,
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import {
  PageDetailHeader,
  PageProvider,
  useAppElementTree,
  usePage,
} from '@codelab/frontend/modules/page'
import { userSlice } from '@codelab/frontend/modules/user'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { Empty } from 'antd'
import { reduxStoreWrapper } from 'apps/web/src/store/reduxStoreWrapper'
import { observer } from 'mobx-react-lite'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'

const PageBuilder: CodelabPage<any> = observer(() => {
  const store = useStore()
  const currentPageId = useCurrentPageId()
  const { page } = usePage(currentPageId, store.pageStore)
  const { elementTree } = useElementGraphContext()
  const { appElementTree } = useAppElementTree(store.pageStore)

  if (!page || !elementTree) {
    return <Empty />
  }

  return (
    <>
      <Head>
        <title>{page.name} | Builder | Codelab</title>
      </Head>
      <Builder
        elementTree={appElementTree}
        tree={elementTree}
        typeStore={store.typeStore}
      />
    </>
  )
})

export default PageBuilder

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: reduxStoreWrapper.getServerSideProps(
    (store) =>
      async ({ req, res }: GetServerSidePropsContext) => {
        const session = await getSession(req, res)

        getGraphQLClient().setHeaders({
          cookie: `${req.headers.cookie}`,
        })

        store.dispatch(userSlice.actions.setAuthenticatedUser(session?.user))

        return { props: {} }
      },
  ),
})

PageBuilder.Layout = observer((page) => {
  const store = useStore()

  return (
    <BuilderContext>
      <PageProvider pages={store.pageStore}>
        <BuilderDashboardTemplate
          Header={() => <PageDetailHeader pages={store.pageStore} />}
          MainPane={MainPaneBuilder}
          MetaPane={observer(() => (
            <MetaPaneBuilderPage typeStore={store.typeStore} />
          ))}
          SidebarNavigation={BuilderSidebarNavigation}
          headerHeight={38}
        >
          {page.children}
        </BuilderDashboardTemplate>
      </PageProvider>
    </BuilderContext>
  )
})
