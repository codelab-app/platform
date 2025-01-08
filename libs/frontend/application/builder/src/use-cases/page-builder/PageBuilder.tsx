'use client'

import type {
  IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'

import { tracker } from '@codelab/frontend/shared/utils'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'

import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

export interface IPageBuilderProps {
  RootRenderer: IRootRenderer
  page?: IPageModel
  rendererType: RendererType.PageBuilder | RendererType.Preview
}

/**
 * Generic builder used for both Component & Element
 *
 * Remove observable here, otherwise has loop
 */
export const PageBuilder = observer(
  ({ page, rendererType, RootRenderer }: IPageBuilderProps) => {
    tracker.useRenderedCount('PageBuilder')

    const { rendererService } = useApplicationStore()

    if (!page) {
      throw new Error('Missing page model')
    }

    const searchParams = useSearchParams()

    useInitializeBuilder({
      containerNode: page,
      rendererType,
      searchParams,
    })

    const renderer = rendererService.activeRenderer?.maybeCurrent

    if (!renderer) {
      return null
    }

    return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
  },
)

PageBuilder.displayName = 'PageBuilder'
