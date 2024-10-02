'use client'

import type {
  IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'

import { observer } from 'mobx-react-lite'

import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

export interface IPageBuilderProps {
  RootRenderer: IRootRenderer
  page?: IPageModel
  rendererType: RendererType.PageBuilder | RendererType.Preview
}

/**
 * Generic builder used for both Component & Element
 */
export const PageBuilder = observer<IPageBuilderProps>(
  ({ page, rendererType, RootRenderer }) => {
    if (!page) {
      throw new Error('Missing page model')
    }

    const { renderer } = useInitializeBuilder({
      containerNode: page,
      rendererType,
    })

    return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
  },
)

PageBuilder.displayName = 'Builder'
