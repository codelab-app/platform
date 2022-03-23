import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  BuilderContext,
  BuilderDashboardTemplate,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderPage,
} from '@codelab/frontend/modules/builder'
import { PageDetailHeader, PageProvider } from '@codelab/frontend/modules/page'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { observer } from 'mobx-react-lite'
import React from 'react'

const PageBuilder: CodelabPage<any> = observer(() => {
  const store = useStore()
  const currentPageId = useCurrentPageId()
  // const { page } = usePage(currentPageId, store.pageService)
  // const { elementTree } = useElementGraphContext() // page.tree
  // const { appElementTree } = useAppElementTree(store.pageService) // app.tree

  // if (!page || !elementTree) {
  //   return <Empty />
  // }

  return null

  // return (
  //   <>
  //     <Head>
  //       <title>{page.name} | Builder | Codelab</title>
  //     </Head>
  //     <Builder
  //       elementTree={appElementTree}
  //       tree={elementTree}
  //       typeStore={store.typeStore}
  //     />
  //   </>
  // )
})

export default PageBuilder

export const getServerSideProps = withPageAuthRequired({
  // getServerSideProps: reduxStoreWrapper.getServerSideProps(
  //   (store) =>
  //     async ({ req, res }: GetServerSidePropsContext) => {
  //       const session = await getSession(req, res)
  //       getGraphQLClient().setHeaders({
  //         cookie: `${req.headers.cookie}`,
  //       })
  //       store.dispatch(userSlice.actions.setAuthenticatedUser(session?.user))
  //       return { props: {} }
  //     },
  // ),
})

PageBuilder.Layout = observer((page) => {
  const store = useStore()

  return (
    <BuilderContext elementService={store.elementService}>
      <PageProvider pages={store.pageService}>
        <BuilderDashboardTemplate
          Header={() => <PageDetailHeader pages={store.pageService} />}
          MainPane={observer(() => (
            <MainPaneBuilder atomService={store.atomService} />
          ))}
          MetaPane={observer(() => (
            <MetaPaneBuilderPage
              atomService={store.atomService}
              typeService={store.typeService}
            />
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
