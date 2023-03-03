import type {
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import type { Element } from '@codelab/frontend/domain/element'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
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
