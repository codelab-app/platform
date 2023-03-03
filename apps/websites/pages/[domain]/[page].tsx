// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { pageSlug as getPageSlug } from '@codelab/backend/graphql'
import { RendererType } from '@codelab/frontend/abstract/core'
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
    initialData: renderingData,
    pageId,
    rendererType: RendererType.Preview,
    renderService: store.appRenderService,
  })

  const { renderer, page } = value ?? {}

  return (
    <>
      <Head>
        <title>{page?.name ?? 'Loading...'}</title>
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
  // Do not return any paths to be generated at build time
  // 1. The backend is not deployed yet so request to get page data would fail
  // 2. In production when many pages will be created - build may take too long
  // Instead allow manually to build pages by users and keep already generated pages between deploys
  return { fallback: 'blocking', paths: [] }
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
  const { domain, page: pageSlug } = context.params

  const [app] = await appService.getAll({
    domains_SOME: { name_IN: [String(domain)] },
  })

  if (!app) {
    throw new Error(`No apps found for "${domain}" domain`)
  }

  const page = app.pages.find(
    (appPage) => getPageSlug({ name: appPage.current.name }) === pageSlug,
  )

  if (!page) {
    throw new Error(`Page ${pageSlug} on "${domain}" domain Not found`)
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
  }
}
