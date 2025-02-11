'use client'

import { RendererType } from '@codelab/frontend/abstract/application'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const PageBuilderConnector = observer(
  ({ pageId }: { pageId: string }) => {
    const { pageDomainService } = useDomainStore()
    /**
     * We push the responsibility of data requirement closer to the page, which allows us to check the data using mobx state as opposed to some `isHydrating` state hook (which gets reset across requests)
     */
    const page = pageDomainService.pages.get(pageId)

    if (!page) {
      return <Spinner />
    }

    return (
      <BuilderProvider
        containerNode={page}
        rendererType={RendererType.PageBuilder}
      >
        <PageBuilder
          // Decouple renderer from builder
          RootRenderer={RootRenderer}
          page={page}
        />
      </BuilderProvider>
    )
  },
)

PageBuilderConnector.displayName = 'PageBuilderContainer'
