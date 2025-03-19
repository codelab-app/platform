'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { PageConnector } from '@codelab/frontend-application-page/views'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'

import { PageBuilder } from './PageBuilder'

export const PageBuilderContainer = ({
  appId,
  pageId,
}: {
  appId: string
  pageId: string
}) => {
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
          <PageBuilder
            // Decouple renderer from builder
            RootRenderer={RootRenderer}
            appId={appId}
            page={page}
          />
        </BuilderProvider>
      )}
    </PageConnector>
  )
}

PageBuilderContainer.displayName = 'PageBuilderContainer'
