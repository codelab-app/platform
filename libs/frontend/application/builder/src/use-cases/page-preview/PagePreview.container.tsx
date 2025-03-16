'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { PageConnector } from '@codelab/frontend-application-page/views'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { observer } from 'mobx-react-lite'

import { PageBuilder } from '../page-builder/PageBuilder'

export const PagePreviewContainer = observer(
  ({ pageId }: { pageId: string }) => {
    return (
      <PageConnector id={pageId}>
        {(page) => (
          <BuilderProvider
            containerNode={page}
            rendererType={RendererType.Preview}
          >
            <PageBuilder RootRenderer={RootRenderer} page={page} />
          </BuilderProvider>
        )}
      </PageConnector>
    )
  },
)

PagePreviewContainer.displayName = 'PagePreviewContainer'
