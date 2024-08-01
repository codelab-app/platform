'use client'

import {
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

interface IPageBuilderProps {
  RootRenderer: IRootRenderer
  pageSlug: string
}

/**
 * Generic builder used for both Component & Element
 */
export const PageBuilder = observer<IPageBuilderProps>(
  ({ pageSlug, RootRenderer }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.findBySlug(pageSlug)

    const { renderer } = useInitializeBuilder({
      containerNode: page,
      rendererType: RendererType.PageBuilder,
    })

    return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
  },
)

PageBuilder.displayName = 'Builder'
