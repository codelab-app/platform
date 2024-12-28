'use client'

import type {
  IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'

import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'

import { useInitializeBuilder } from '../../services'
import { BaseBuilder } from '../base-builder'

export interface IComponentBuilderProps {
  RootRenderer: IRootRenderer
  component?: IComponentModel
  rendererType: RendererType.ComponentBuilder | RendererType.Preview
}

/**
 * Generic builder used for both Component & Element
 *
 * Remove observable here, otherwise has loop
 */
export const ComponentBuilder = observer(
  ({ component, rendererType, RootRenderer }: IComponentBuilderProps) => {
    const { rendererService } = useApplicationStore()

    if (!component) {
      throw new Error('Component model is missing')
    }

    const searchParams = useSearchParams()

    useInitializeBuilder({
      containerNode: component,
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

ComponentBuilder.displayName = 'ComponentBuilder'
