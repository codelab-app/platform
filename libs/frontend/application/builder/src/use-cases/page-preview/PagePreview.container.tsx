'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { PageConnector } from '@codelab/frontend/infra/connector'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'

import { PageBuilder } from '../page-builder/PageBuilder'

export const PagePreviewContainer = ({
  appId,
  pageId,
}: {
  pageId: string
  appId: string
}) => {
  return (
    <PageConnector id={pageId}>
      {(page) => (
        <BuilderProvider
          containerNode={page}
          rendererType={RendererType.Preview}
        >
          <PageBuilder RootRenderer={RootRenderer} appId={appId} page={page} />
        </BuilderProvider>
      )}
    </PageConnector>
  )
}

PagePreviewContainer.displayName = 'PagePreviewContainer'
