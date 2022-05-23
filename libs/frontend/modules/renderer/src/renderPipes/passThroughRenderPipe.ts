import { Element } from '@codelab/frontend/modules/element'
import {
  IAtomType,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { BaseRenderPipe } from './renderPipe.base'

/**
 * Render pipe that renders whatever you give it - useful for unit testing
 */
@model('@codelab/PassThroughRenderPipe')
export class PassThroughRenderPipe
  extends ExtendedModel(BaseRenderPipe, {})
  implements IRenderPipe
{
  render(element: Element, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (this.renderer.debugMode) {
      console.info(`PassThroughRenderPipe: rendering input`, {
        element,
        props,
      })
    }

    return RenderOutput.withAtom({
      props: props,
      atomType: element.atom?.current.type || IAtomType.ReactFragment,
      elementId: element.id,
    })
  }
}
