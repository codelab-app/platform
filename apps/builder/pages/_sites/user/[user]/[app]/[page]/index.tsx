import { AppPagePageProps } from '@codelab/frontend/abstract/types'
import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { Renderer } from '@codelab/frontend/modules/renderer'
import { createMobxState } from '@codelab/frontend/modules/store'
import { useStore } from '@codelab/frontend/presenter/container'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

const Index = (props: AppPagePageProps) => {
  const store = useStore()
  const { pageService, storeService, appService, builderRenderService } = store
  const router = useRouter()
  const { pageId, storeId, appId } = props
  const app = appService.app(appId)
  const appStore = storeService.store(storeId)
  const page = pageService.pages.get(pageId)

  const renderer = useMemo(() => {
    if (!page || !appStore || !app) {
      return
    }

    const result = builderRenderService.addRenderer(
      pageId,
      page.elementTree,
      null,
      appStore,
      createMobxState(appStore, [app], [page], router),
    )

    return result
  }, [pageId])

  if (!page) {
    throw new Error('Page not found')
  }

  if (!appStore) {
    throw new Error('App store not found')
  }

  return (
    <>
      <Head>
        <title>{page?.name}</title>
      </Head>

      {page.elementTree && renderer ? (
        <Renderer renderRoot={renderer.renderRoot.bind(renderer)} />
      ) : null}
    </>
  )
}

export default Index

export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log('getStaticPaths', `env ${process.env.NODE_ENV}`)

  const isProd = process.env.NODE_ENV === 'production'

  if (isProd) {
    return { paths: [], fallback: 'blocking' }
  }

  const { userService } = initializeStore()
  await userService.loadUsers()

  const paths = [...userService.users.values()]
    .map((user) => {
      console.log('apps', [...user.apps.values()])

      return [...user.apps.values()]
        .map((app) => {
          return app.current.pages.map((page) => {
            return {
              params: {
                user: user.username,
                app: app.current.slug,
                page: page.current.slug,
              },
            }
          })
        })
        .flat()
    })
    .flat()

  console.log('getStaticPaths', paths)

  return {
    paths,
    // fallback true allows sites to be generated using ISR
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<AppPagePageProps> = async (
  context,
) => {
  if (!context.params) {
    throw new Error('No context params ')
  }

  const store = initializeStore({})
  const { appService, pageService, storeService, typeService } = store
  const { app: appSlug, page: pageSlug } = context.params

  const apps = await appService.getAll({
    slug: String(appSlug),
  })

  const app = apps[0]

  if (!app) {
    throw new Error(`App with slug ${appSlug} not found`)
  }

  const [page] = await pageService.getAll({
    slug: pageSlug as string,
  })

  if (!page) {
    throw new Error(`Page ${pageSlug} of App ${appSlug} Not found`)
  }

  const appStore = app?.store?.id
    ? await storeService.getOne(app.store.id)
    : null

  if (appStore?.stateApiId) {
    typeService.types.get(appStore?.stateApiId)
  }

  // components are needed to build pageElementTree
  // therefore they must be loaded first
  // This requires a current userId to work
  // await componentService.loadComponentTrees()
  return {
    props: {
      appId: app?.id,
      pageId: page.id,
      storeId: app?.store?.id,
    },
    revalidate: 10,
  }
}
