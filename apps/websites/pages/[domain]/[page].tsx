import { RendererType } from '@codelab/frontend/abstract/core'
import type { AppPagePageProps } from '@codelab/frontend/abstract/types'
import { pageApi } from '@codelab/frontend/domain/page'
import { Renderer } from '@codelab/frontend/domain/renderer'
import { initializeStore } from '@codelab/frontend/presentation/client/mobx'
import {
  useRenderedPage,
  useStore,
} from '@codelab/frontend/presentation/container'
import { useMountEffect } from '@react-hookz/web'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

const Index = (props: AppPagePageProps) => {
  const store = useStore()
  const { renderingData } = props

  const [{ result }, actions] = useRenderedPage({
    initialData: renderingData,
    rendererType: RendererType.Preview,
    renderService: store.appRenderService,
  })

  useMountEffect(actions.execute)

  const { page, renderer } = result ?? {}

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
  const { appService } = store
  const { domain, page } = context.params
  const pageUrl = page ? `/${page}` : '/'

  const [app] = await appService.getAll({
    domains_SOME: { name_IN: [String(domain)] },
  })

  if (!app) {
    throw new Error(`No apps found for "${domain}" domain`)
  }

  const foundPage = app.pages.find(
    (appPage) => appPage.current.url === `/${pageUrl}`,
  )

  if (!foundPage) {
    throw new Error(`Page with ${pageUrl} URL for "${domain}" domain Not found`)
  }

  const renderingData = await pageApi.GetRenderedPageAndCommonAppData({
    appId: app.id,
    pageId: foundPage.id,
  })

  return {
    props: {
      appId: app.id,
      pageId: foundPage.id,
      renderingData,
    },
  }
}
