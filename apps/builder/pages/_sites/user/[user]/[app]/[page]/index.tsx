import type { AppPagePageProps } from '@codelab/frontend/abstract/types'
import { Renderer } from '@codelab/frontend/domain/renderer'
import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { useStore } from '@codelab/frontend/presenter/container'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { useAsync } from 'react-use'

const Index = (props: AppPagePageProps) => {
  const store = useStore()

  const {
    storeService,
    componentService,
    pageService,
    appService,
    builderRenderService,
  } = store

  const { pageId, storeId, appId } = props
  const app = appService.app(appId)
  const appStore = storeService.store(storeId)
  const page = pageService.pages.get(pageId)
  const components = componentService.componentList

  const { value: renderer } = useAsync(async () => {
    if (!page?.elementTree || !appStore || !app) {
      return
    }

    const result = await builderRenderService.addRenderer({
      id: pageId,
      pageTree: page.elementTree,
      appTree: null,
      components,
      appStore,
    })

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
        <title>{page.name}</title>
      </Head>

      {renderer ? (
        <Renderer renderRoot={renderer.renderRoot.bind(renderer)} />
      ) : null}
    </>
  )
}

export default Index

/**
 * - `getStaticPaths` requires using `getStaticProps`
 * - `getStaticPaths` will only run during build in production, it will not be called during runtime.
 */
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

  const { userService, appService, typeService, pageService, storeService } =
    store

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

  const appStore = app.store.id ? await storeService.getOne(app.store.id) : null

  // components are needed to build pageElementTree
  // therefore they must be loaded first
  // This requires a current userId to work
  return {
    props: {
      appId: app.id,
      pageId: page.id,
      storeId: app.store.id,
    },
    revalidate: 10,
  }
}
