import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import { setClientAuthHeaders } from '@codelab/frontend/model/infra/graphql'
import { initializeStore, useStore } from '@codelab/frontend/model/infra/mobx'
import {
  Builder,
  BuilderContext,
  createMobxState,
} from '@codelab/frontend/modules/builder'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import {
  AccessTokenPayload,
  APP_ID,
  IApp,
  IPage,
  IStore,
  PAGE_ID,
  WithUrlParams,
} from '@codelab/shared/abstract/core'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type PageBuilderProps = {
  apps: Array<IApp>
  store: IStore | null
  pages: Array<IPage>
}

const PageBuilder: CodelabPage<PageBuilderProps> = observer((props) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const { apps, pages, store } = props
  const app = apps.find((_app) => _app.id === appId)
  const page = pages.find((_page) => _page.id === pageId)

  if (!page) {
    throw new Error('Page not found')
  }

  const {
    elementService,
    pageElementTree,
    providerElementTree,
    storeService,
    builderService,
  } = useStore()

  const router = useRouter()

  useEffect(() => {
    // eslint-disable-next-line padding-line-between-statements
    ;(async () => {
      /**
       * Construct the ElementTree's for
       *
       * - page tree
       * - provider tree
       */
      const [elementTree, providerTree] = await Promise.all([
        pageElementTree.getTree(page.rootElement.id),
        providerElementTree.getTree(page.providerElement.id),
      ])

      // initialize renderer
      await builderService.builderRenderer.init(
        pageElementTree,
        providerElementTree,
        createMobxState(store, apps, pages, router),
      )

      return {
        page,
        elementTree,
        providerTree,
        storeTree: store,
      }
    })()

    return () => {
      // this now gets called when the component unmounts
      console.log('builder.tsx unmount()')
    }
  }, [])

  const elementTree = builderService.builderRenderer.tree

  return (
    <>
      <Head>
        <title>{page?.name} | Builder | Codelab</title>
      </Head>
      {elementTree ? (
        <Builder
          currentDragData={builderService.currentDragData}
          deleteModal={elementService.deleteModal}
          elementTree={elementTree}
          key={builderService.builderRenderer.tree?.root?.id}
          selectedElement={builderService.selectedElement}
          setHoveredElement={builderService.setHoveredElement.bind(
            builderService,
          )}
          set_selectedElement={builderService.set_selectedElement.bind(
            builderService,
          )}
        />
      ) : null}
    </>
  )
})

export const getServerSideProps = withPageAuthRequired<
  PageBuilderProps,
  WithUrlParams<APP_ID | PAGE_ID>
>({
  getServerSideProps: async (ctx) => {
    const { req, res, params, query } = ctx
    const session = await getSession(req, res)
    const user = session?.user as AccessTokenPayload

    // Set auth token from Next.js session, and set headers with bearer
    await setClientAuthHeaders(ctx)

    const rootStore = initializeStore({ user })
    const appId = throwIfUndefined(params?.appId)
    // const pageId = throwIfUndefined(params?.pageId)
    // Props to pass into our page
    const apps = await rootStore.appService.getAll()
    const pages = await rootStore.pageService.getAll()
    const app = apps.find((_app) => _app.id === appId)

    const store = app?.store?.id
      ? (await rootStore.storeService.getOne(app?.store?.id)) ?? null
      : null

    return {
      props: { snapshot: getSnapshot(rootStore), apps, pages, store },
    }
  },
})

const PageBuilderLayout = observer((page) => {
  const {
    pageElementTree,
    builderService,
    elementService,
    pageService,
    atomService,
    componentService,
    userService,
    typeService,
  } = useStore()

  return (
    <BuilderContext
      builderService={builderService}
      elementService={elementService}
    >
      {page.children}
      {/* <BuilderDashboardTemplate */}
      {/*  Header={() => <PageDetailHeader pageService={pageService} />} */}
      {/*  MainPane={ */}
      {/*    () => null */}
      {/*    // <BuilderMainPane */}
      {/*    //   atomService={atomService} */}
      {/*    //   builderService={builderService} */}
      {/*    //   componentService={componentService} */}
      {/*    //   elementService={elementService} */}
      {/*    //   key={builderService.builderRenderer.tree?.root?.id} */}
      {/*    //   pageElementTree={pageElementTree} */}
      {/*    //   userService={userService} */}
      {/*    // /> */}
      {/*  } */}
      {/*  MetaPane={ */}
      {/*    () => null */}
      {/*    // <MetaPane */}
      {/*    //   atomService={atomService} */}
      {/*    //   builderService={builderService} */}
      {/*    //   componentService={componentService} */}
      {/*    //   elementService={elementService} */}
      {/*    //   elementTree={pageElementTree} */}
      {/*    //   key={builderService.builderRenderer.tree?.root?.id} */}
      {/*    //   typeService={typeService} */}
      {/*    // /> */}
      {/*  } */}
      {/*  SidebarNavigation={ */}
      {/*    () => null */}
      {/*    // <BuilderSidebarNavigation */}
      {/*    //   builderTab={builderService.builderTab} */}
      {/*    //   key={builderService.builderRenderer.tree?.root?.id} */}
      {/*    //   setBuilderTab={builderService.setBuilderTab} */}
      {/*    // /> */}
      {/*  } */}
      {/*  builderService={builderService} */}
      {/*  headerHeight={38} */}
      {/*  key={builderService.builderRenderer.tree?.id} */}
      {/* > */}
      {/*  {page.children} */}
      {/* </BuilderDashboardTemplate> */}
    </BuilderContext>
  )
})

PageBuilderLayout.displayName = 'PageBuilderLayout'

PageBuilder.Layout = PageBuilderLayout

export default PageBuilder

PageBuilder.displayName = 'PageBuilder'
