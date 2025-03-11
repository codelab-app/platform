'use client'

import type { IRootRenderer } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'

import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

import { BaseBuilder } from '../base-builder'

export interface IPageBuilderProps {
  RootRenderer: IRootRenderer
  page?: IPageModel
}

/**
 * Generic builder used for both Component & Element
 *
 * Remove observable here, otherwise has loop
 */
export const PageBuilder = observer(
  ({ page, RootRenderer }: IPageBuilderProps) => {
    // tracker.useRenderedCount('PageBuilder')

    const { rendererService } = useApplicationStore()

    if (!page) {
      throw new Error('Missing page model')
    }

    const renderer = rendererService.activeRenderer?.maybeCurrent

    if (!renderer) {
      return <Spinner />
    }

    return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
  },
)

PageBuilder.displayName = 'PageBuilder'
