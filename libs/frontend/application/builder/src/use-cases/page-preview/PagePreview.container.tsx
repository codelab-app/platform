'use client'

import type { IPageBuilderRoute } from '@codelab/frontend-abstract-application'

import { RendererType } from '@codelab/frontend-abstract-application'
import { PageConnector } from '@codelab/frontend-infra-connector'
import { BuilderProvider } from '@codelab/frontend-presentation-container'

import { PageBuilder } from '../page-builder/PageBuilder'

export const PagePreviewContainer = ({
  context,
}: {
  context: IPageBuilderRoute
}) => {
  const {
    params: { pageId },
  } = context

  return (
    <PageConnector id={pageId}>
      {(page) => (
        <BuilderProvider
          containerNode={page}
          rendererType={RendererType.Preview}
        >
          <PageBuilder context={context} page={page} />
        </BuilderProvider>
      )}
    </PageConnector>
  )
}

PagePreviewContainer.displayName = 'PagePreviewContainer'
