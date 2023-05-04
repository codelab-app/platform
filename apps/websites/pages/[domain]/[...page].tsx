// eslint-disable-next-line @nx/enforce-module-boundaries
import { PageRepository } from '@codelab/backend/domain/page'
import { RendererType } from '@codelab/frontend/abstract/core'
import type { ProductionWebsiteProps } from '@codelab/frontend/abstract/types'
import { pageApi } from '@codelab/frontend/domain/page'
import { Renderer } from '@codelab/frontend/domain/renderer'
import { useRenderedPage } from '@codelab/frontend/presentation/container'
import { useMountEffect } from '@react-hookz/web'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

const Index = (props: ProductionWebsiteProps) => {
  const [{ result }, actions] = useRenderedPage({
    productionProps: props,
    rendererType: RendererType.Preview,
  })

  useMountEffect(actions.execute)

  return (
    <>
      <Head>
        <title>{result?.page.name ?? 'Loading...'}</title>
      </Head>

      {result?.renderer && <Renderer renderer={result.renderer} />}
    </>
  )
}

export default Index

/**
 * - `getStaticPaths` requires using `getStaticProps`
 * - `getStaticPaths` will only run during build in production, it will not be called during runtime.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // Do not return any paths to be generated at build time
  // 1. The backend is not deployed yet so request to get page data would fail
  // 2. In production when many pages will be created - build may take too long
  // Instead allow manually to build pages by users and keep already generated pages between deploys
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps<ProductionWebsiteProps> = async (
  context,
) => {
  console.log('getStaticProps', context.params)

  if (!context.params) {
    throw new Error('No context params ')
  }

  const pageRepository = new PageRepository()
  const { domain, page } = context.params
  const pageStr = Array.isArray(page) ? page.join('/') : page
  const pageUrl = pageStr ? `/${pageStr}` : '/'

  const foundPage = await pageRepository.findOne({
    app: { domains_SOME: { name_IN: [String(domain)] } },
    url: pageUrl,
  })

  if (!foundPage) {
    throw new Error(`Page with ${pageUrl} URL for "${domain}" domain Not found`)
  }

  const renderingData = await pageApi.GetRenderedPageAndCommonAppData({
    appId: foundPage.app.id,
    pageId: foundPage.id,
  })

  return {
    props: {
      appId: foundPage.app.id,
      pageId: foundPage.id,
      renderingData,
    },
  }
}
