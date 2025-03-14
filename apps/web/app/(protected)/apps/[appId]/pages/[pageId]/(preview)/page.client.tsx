'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { PageConnector } from '@codelab/frontend-application-page/views'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const PagePreviewPageContainer = observer(
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
