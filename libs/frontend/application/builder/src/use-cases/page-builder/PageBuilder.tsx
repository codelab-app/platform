'use client'

import type {
  IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'

import { tracker } from '@codelab/frontend/infra/logger'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'

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
    tracker.useRenderedCount('PageBuilder')

    const { rendererService } = useApplicationStore()

    if (!page) {
      throw new Error('Missing page model')
    }

    const renderer = rendererService.activeRenderer?.maybeCurrent

    if (!renderer) {
      return null
    }

    return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
  },
)

PageBuilder.displayName = 'PageBuilder'
