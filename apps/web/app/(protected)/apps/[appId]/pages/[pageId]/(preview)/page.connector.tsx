'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const PagePreviewPageConnector = observer(
  ({ pageId }: { pageId: string }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(pageId)

    if (!page) {
      return <Spinner />
    }

    return (
      <BuilderProvider containerNode={page} rendererType={RendererType.Preview}>
        <PageBuilder RootRenderer={RootRenderer} page={page} />
      </BuilderProvider>
    )
  },
)
