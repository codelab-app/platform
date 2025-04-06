'use client'

import type { IPageModel } from '@codelab/frontend/abstract/domain'

import {
  type IPageBuilderRoute,
  type IRootRenderer,
  IRouteType,
} from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'
import { observer } from 'mobx-react-lite'

import { BaseBuilder } from '../base-builder'

export interface IPageBuilderProps {
  RootRenderer: IRootRenderer
  context: IPageBuilderRoute
  page?: IPageModel
}

/**
 * Generic builder used for both Component & Element
 *
 * Remove observable here, otherwise has loop
 */
export const PageBuilder = observer(
  ({ context, page, RootRenderer }: IPageBuilderProps) => {
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
          ...context,
          type: IRouteType.Page,
        }}
        renderer={renderer}
      />
    )
  },
)

PageBuilder.displayName = 'PageBuilder'
