// eslint-disable-next-line @nx/enforce-module-boundaries
import type { IAppProductionDto } from '@codelab/frontend/abstract/domain'
import { RootRenderer } from '@codelab/frontend-application-renderer'
import {
  AppProductionService,
  useAppProduction,
} from '@codelab/frontend-application-app'
import { useMountEffect } from '@react-hookz/web'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

const Index = (props: IAppProductionDto) => {
  const [{ error, result, status }, actions] = useAppProduction(props)

  useMountEffect(actions.execute)

  return (
    <>
      <Head>
        <title>{result?.page.name ?? 'Loading...'}</title>
      </Head>

      {result?.renderer && <RootRenderer renderer={result.renderer} />}
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

export const getStaticProps: GetStaticProps<IAppProductionDto> = async (
  context,
) => {
  console.log(context)

  if (!context.params) {
    throw new Error('No context params ')
  }

  const { domain, page } = context.params
  const pageStr = Array.isArray(page) ? page.join('/') : page
  const pageUrl = pageStr ? `/${pageStr}` : '/'

  const props = await AppProductionService.getAppProductionData({
    domain: String(domain),
    pageUrlPattern: pageUrl,
  })

  return { props }
}
