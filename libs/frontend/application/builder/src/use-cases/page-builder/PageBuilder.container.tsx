'use client'

import type { IPageBuilderRoute } from '@codelab/frontend-abstract-application'

import { RendererType } from '@codelab/frontend-abstract-application'
import { PageConnector } from '@codelab/frontend-infra-connector'
import { BuilderProvider } from '@codelab/frontend-presentation-container'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'

import { PageBuilder } from './PageBuilder'

export const PageBuilderContainer = ({
  context,
}: {
  context: IPageBuilderRoute
}) => {
  const {
    params: { pageId },
  } = context

  return (
    /**
     * We push the responsibility of data requirement closer to the page, which allows us to check the data using mobx state as opposed to some `isHydrating` state hook (which gets reset across requests)
     */
    <PageConnector id={pageId}>
      {(page) => (
        <BuilderProvider
          containerNode={page}
          rendererType={RendererType.PageBuilder}
        >
          <PageBuilder context={context} page={page} />
        </BuilderProvider>
      )}
    </PageConnector>
  )
}

PageBuilderContainer.displayName = 'PageBuilderContainer'
