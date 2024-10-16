import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'

import { isAtom } from '@codelab/frontend/abstract/domain'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'

import { RenderOutput } from './render-output'
import { BaseRenderPipe } from './render-pipe.base'

/**
 * Render pipe that renders whatever you give it - useful for unit testing
 */
@model('@codelab/PassThroughRenderPipe')
export class PassThroughRenderPipe
  extends ExtendedModel(BaseRenderPipe, {})
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    const element = runtimeElement.element.current
    const props = runtimeElement.runtimeProps.evaluatedProps

    // TODO: element.renderType cannot be component, we should throw error here
    if (this.renderer.debugMode) {
      console.info('PassThroughRenderPipe: rendering input', {
        element,
        props,
      })
    }

    return RenderOutput.withAtom({
      atomType: isAtom(element.renderType.current)
        ? element.renderType.current.type
        : IAtomType.ReactFragment,
      props,
      runtimeElement,
    })
  }
}
