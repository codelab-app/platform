'use client'

import type { IPageModel } from '@codelab/frontend/abstract/domain'

import {
  type IRootRenderer,
  IRouteType,
} from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'
import { observer } from 'mobx-react-lite'

import { BaseBuilder } from '../base-builder'

export interface IPageBuilderProps {
  RootRenderer: IRootRenderer
  appId: string
  page?: IPageModel
}

/**
 * Generic builder used for both Component & Element
 *
 * Remove observable here, otherwise has loop
 */
export const PageBuilder = observer(
  ({ appId, page, RootRenderer }: IPageBuilderProps) => {
    // tracker.useRenderedCount('PageBuilder')

    const { rendererService } = useApplicationStore()

    if (!page) {
      throw new Error('Missing page model')
    }

    const renderer = rendererService.activeRenderer?.maybeCurrent

    if (!renderer) {
      return <Spinner />
    }

    return (
      <BaseBuilder
        RootRenderer={RootRenderer}
        context={{
          params: {
            appId,
            pageId: page.id,
          },
          type: IRouteType.Page,
        }}
        renderer={renderer}
      />
    )
  },
)

PageBuilder.displayName = 'PageBuilder'
