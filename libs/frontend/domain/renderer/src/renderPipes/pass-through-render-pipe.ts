import type {
  IElementModel,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/abstract/core'
import type { IPropData } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { RenderOutput } from '../utils'
import { BaseRenderPipe } from './render-pipe.base'

/**
 * Render pipe that renders whatever you give it - useful for unit testing
 */
@model('@codelab/PassThroughRenderPipe')
export class PassThroughRenderPipe
  extends ExtendedModel(BaseRenderPipe, {})
  implements IRenderPipe
{
  render(element: IElementModel, props: IPropData): IRenderOutput {
    // TODO: element.renderType cannot be component, we should throw error here
    if (this.renderer.debugMode) {
      console.info(`PassThroughRenderPipe: rendering input`, {
        element,
        props,
      })
    }

    return RenderOutput.withAtom({
      atomType: isAtomInstance(element.renderType)
        ? element.renderType.current.type
        : IAtomType.ReactFragment,
      element,
      props: props,
    })
  }
}
