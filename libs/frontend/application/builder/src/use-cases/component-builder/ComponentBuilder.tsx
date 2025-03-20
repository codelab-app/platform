'use client'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'

import {
  type IRootRenderer,
  IRouteType,
} from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { BaseBuilder } from '../base-builder'

export interface IComponentBuilderProps {
  RootRenderer: IRootRenderer
  component?: IComponentModel
}

/**
 * Generic builder used for both Component & Element
 *
 * Remove observable here, otherwise has loop
 */
export const ComponentBuilder = observer(
  ({ component, RootRenderer }: IComponentBuilderProps) => {
    const { rendererService } = useApplicationStore()

    if (!component) {
      throw new Error('Component model is missing')
    }

    const renderer = rendererService.activeRenderer?.maybeCurrent

    if (!renderer) {
      return null
    }

    return (
      <BaseBuilder
        RootRenderer={RootRenderer}
        context={{
          params: {
            componentId: component.id,
          },
          type: IRouteType.Component,
        }}
        renderer={renderer}
      />
    )
  },
)

ComponentBuilder.displayName = 'ComponentBuilder'
