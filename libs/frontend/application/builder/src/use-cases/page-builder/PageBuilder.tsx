'use client'

import {
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

interface IPageBuilderProps {
  RootRenderer: IRootRenderer
  pageId: string
}

/**
 * Generic builder used for both Component & Element
 */
export const PageBuilder = observer<IPageBuilderProps>(
  ({ pageId, RootRenderer }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(pageId)

    if (!page) {
      return null
    }

    const { renderer } = useInitializeBuilder({
      containerNode: page,
      rendererType: RendererType.PageBuilder,
    })

    return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
  },
)

PageBuilder.displayName = 'Builder'
