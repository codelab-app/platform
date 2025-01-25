'use client'

import type { PageContextParams } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

export const metadata: Metadata = {
  title: 'App Builder | Codelab',
}

const Page = async ({ params: { pageId } }: { params: PageContextParams }) => {
  return <PageBuilderConnector pageId={pageId} />
}

Page.displayName = 'Page'

export default Page
