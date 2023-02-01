import type { AppPagePageProps } from '@codelab/frontend/abstract/types'
import { Renderer } from '@codelab/frontend/domain/renderer'
import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import {
  useRenderedPage,
  useStore,
} from '@codelab/frontend/presenter/container'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

const Index = (props: AppPagePageProps) => {
  const store = useStore()
  const { pageId, appId, renderingData } = props

  const { value } = useRenderedPage({
    appId,
    pageId,
    renderService: store.appRenderService,
    isBuilder: false,
    initialData: renderingData,
  })

  const { renderer, page } = value ?? {}

  return (
    <>
      <Head>
        <title>{page?.name}</title>
      </Head>

      {renderer && <Renderer renderRoot={renderer.renderRoot.bind(renderer)} />}
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
  console.log('getStaticProps', context.params)

  if (!context.params) {
    throw new Error('No context params ')
  }

  const store = initializeStore({})
  const { appService, pageService } = store
  const { app: appSlug, page: pageSlug } = context.params
  const [app] = await appService.getAll({ slug: String(appSlug) })

  if (!app) {
    throw new Error(`App with slug ${appSlug} not found`)
  }

  const page = app.pages.find((p) => p.current.slug === pageSlug)

  if (!page) {
    throw new Error(`Page ${pageSlug} of App ${appSlug} Not found`)
  }

  const renderingData = await pageService.getRenderedPageAndCommonAppData(
    app.id,
    page.id,
  )

  return {
    props: {
      appId: app.id,
      pageId: page.id,
      renderingData,
    },
    revalidate: 10,
  }
}
