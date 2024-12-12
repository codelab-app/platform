'use client'

import type {
  IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'

import { observer } from 'mobx-react-lite'

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
export const ComponentBuilder = ({
  component,
  rendererType,
  RootRenderer,
}: IComponentBuilderProps) => {
  if (!component) {
    throw new Error('Component model is missing')
  }

  const { renderer } = useInitializeBuilder({
    containerNode: component,
    rendererType,
  })

  return <BaseBuilder RootRenderer={RootRenderer} renderer={renderer} />
}

ComponentBuilder.displayName = 'ComponentBuilder'
